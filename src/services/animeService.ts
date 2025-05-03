import { SearchResponse, AnimeDetails } from '../types/anime';

const BASE_URL = 'https://api.jikan.moe/v4';

// Rate limiting queue implementation
class RequestQueue {
  private queue: (() => Promise<void>)[] = [];
  private processing = false;
  private lastRequestTime = 0;
  private readonly minRequestInterval = 1000; // 1 second between requests

  async add<T>(request: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          // Ensure minimum time between requests
          const now = Date.now();
          const timeSinceLastRequest = now - this.lastRequestTime;
          if (timeSinceLastRequest < this.minRequestInterval) {
            await new Promise(resolve => 
              setTimeout(resolve, this.minRequestInterval - timeSinceLastRequest)
            );
          }

          const result = await request();
          this.lastRequestTime = Date.now();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
      this.process();
    });
  }

  private async process() {
    if (this.processing || this.queue.length === 0) return;
    this.processing = true;

    while (this.queue.length > 0) {
      const request = this.queue.shift();
      if (request) {
        await request();
      }
    }

    this.processing = false;
  }
}

const requestQueue = new RequestQueue();

// Search anime with pagination
export const searchAnime = async (
  query: string, 
  page: number = 1,
  signal?: AbortSignal
): Promise<SearchResponse> => {
  return requestQueue.add(async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/anime?q=${encodeURIComponent(query)}&page=${page}&limit=24&order_by=popularity&sort=asc`,
        { signal }
      );

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('Rate limit exceeded. Please wait a moment and try again.');
        }
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch anime');
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('Request was cancelled');
        }
        throw error;
      }
      throw new Error('An unexpected error occurred');
    }
  });
};

// Get anime details by ID
export const getAnimeDetails = async (id: number): Promise<AnimeDetails> => {
  return requestQueue.add(async () => {
    try {
      const response = await fetch(`${BASE_URL}/anime/${id}/full`);

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('Rate limit exceeded. Please wait a moment and try again.');
        }
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch anime details');
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('An unexpected error occurred');
    }
  });
};
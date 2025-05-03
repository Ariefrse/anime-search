export interface Image {
  image_url: string;
  small_image_url?: string;
  large_image_url?: string;
}

export interface Images {
  jpg: Image;
  webp?: Image;
}

export interface Anime {
  mal_id: number;
  url: string;
  images: Images;
  title: string;
  title_english?: string;
  title_japanese?: string;
  type?: string;
  episodes?: number;
  status?: string;
  score: number;
  scored_by?: number;
  rank?: number;
  popularity?: number;
  members?: number;
  synopsis?: string;
}

export interface Pagination {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
  items: {
    count: number;
    total: number;
    per_page: number;
  };
}

export interface SearchResponse {
  pagination: Pagination;
  data: Anime[];
}

export interface Genre {
  mal_id: number;
  type: string;
  name: string;
}

export interface Aired {
  from: string;
  to: string | null;
  string: string;
}

export interface Trailer {
  youtube_id: string;
  url: string;
  embed_url: string;
}

export interface AnimeDetails extends Anime {
  year?: number;
  rating?: string;
  aired?: Aired;
  genres?: Genre[];
  trailer?: Trailer;
  duration?: string;
  source?: string;
  favorites?: number;
  background?: string;
  studios?: { mal_id: number; type: string; name: string }[];
}
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getAnimeDetails } from '../services/animeService';
import { AnimeDetails } from '../types/anime';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';

const AnimeDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [anime, setAnime] = useState<AnimeDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnimeDetails = async () => {
      if (!id) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const animeId = parseInt(id);
        const data = await getAnimeDetails(animeId);
        setAnime(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAnimeDetails();
  }, [id]);

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  if (!anime) {
    return <ErrorState message="Anime not found" />;
  }

  return (
    <div className="max-w-[1200px] mx-auto">
      <Link 
        to="/"
        className="inline-flex items-center px-4 py-2 bg-[#FF69B4] text-white rounded-md hover:bg-[#FF91C8] transition-colors mb-6"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back
      </Link>
      
      <div className="flex gap-[150px]">
        <div className="w-[225px] flex-shrink-0">
          <img 
            src={anime.images.jpg.large_image_url || anime.images.jpg.image_url} 
            alt={anime.title}
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        
        <div className="flex-grow">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Synopsis</h2>
          <p className="text-gray-700 mb-8 leading-relaxed">
            {anime.synopsis || 'No synopsis available.'}
          </p>

          <div className="grid grid-cols-4 gap-4">
            <div className="bg-[#E3F2FD] p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-[#1976D2]">{anime.score?.toFixed(2) || 'N/A'}</div>
              <div className="text-sm text-[#1976D2] mt-1">{anime.scored_by?.toLocaleString() || 0} USERS</div>
            </div>
            
            <div className="bg-[#F3E5F5] p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-[#7B1FA2]">#{anime.rank || 'N/A'}</div>
              <div className="text-sm text-[#7B1FA2] mt-1">RANKED</div>
            </div>
            
            <div className="bg-[#FCE4EC] p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-[#C2185B]">#{anime.popularity || 'N/A'}</div>
              <div className="text-sm text-[#C2185B] mt-1">POPULARITY</div>
            </div>
            
            <div className="bg-[#E8F5E9] p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-[#388E3C]">
                {anime.members?.toLocaleString() || 'N/A'}
              </div>
              <div className="text-sm text-[#388E3C] mt-1">MEMBERS</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeDetailsPage;
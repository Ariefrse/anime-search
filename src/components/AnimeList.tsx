import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Anime } from '../types/anime';

interface AnimeListProps {
  animeList: Anime[];
}

const AnimeList: React.FC<AnimeListProps> = ({ animeList }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-w-[1200px] mx-auto">
      {animeList.map((anime) => (
        <Link 
          to={`/anime/${anime.mal_id}`} 
          key={anime.mal_id}
          className="bg-white rounded-lg shadow-md hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
          style={{ width: '225px' }}
        >
          <div className="relative pb-[140%]">
            <img
              src={anime.images.jpg.image_url}
              alt={anime.title}
              className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
              loading="lazy"
            />
            {anime.score > 0 && (
              <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white rounded-md px-2 py-1 text-sm flex items-center">
                <Star size={14} className="mr-1 fill-yellow-400 text-yellow-400" />
                <span>{anime.score.toFixed(1)}</span>
              </div>
            )}
          </div>
          <div className="p-3">
            <h3 className="font-medium text-gray-900 mb-1 line-clamp-2 text-sm h-10">
              {anime.title}
            </h3>
            <div className="flex justify-between items-center text-xs text-gray-500">
              <span>{anime.type || 'Unknown'}</span>
              <span>{anime.episodes ? `${anime.episodes} eps` : 'Unknown eps'}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AnimeList;
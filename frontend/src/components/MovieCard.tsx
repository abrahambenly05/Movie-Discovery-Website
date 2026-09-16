import { Link } from 'react-router-dom'
import type { Movie } from '../types/movie'

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'
const PLACEHOLDER_IMAGE = 'https://placehold.co/500x750?text=No+Poster'

interface MovieCardProps {
    movie: Movie
}

function MovieCard({ movie }: MovieCardProps) {
    const posterUrl = movie.poster_path
        ? `${IMAGE_BASE_URL}${movie.poster_path}`
        : PLACEHOLDER_IMAGE

    return (
        <Link
        to={`/movie/${movie.id}`}
        className="block bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition-transform"
        >
            <img
                src={posterUrl}
                alt={movie.title}
                className="w-full h-auto aspect-[2/3] object-cover"
            />
            <div className="p-3">
                <h3 className="text-white font-semibold text-sm truncate">
                    {movie.title}
                </h3>
                <div className="flex items-center gap-1 mt-1">
                    <span className="text-yellow-400 text-xs">★</span>
                    <span className="text-gray-300 text-xs">
                        {movie.vote_average.toFixed(1)}
                    </span>
                </div>
            </div>
        </Link>
    )
}

export default MovieCard
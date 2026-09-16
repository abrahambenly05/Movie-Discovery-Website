import type { Movie } from '../types/movie'
import MovieCard from './MovieCard'

interface MovieGridProps {
    movies: Movie[]
}

function MovieGrid({ movies }: MovieGridProps) {
    if (movies.length === 0) {
        return <p className="text-gray-400">There are no movies to show.</p>
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    )
}

export default MovieGrid
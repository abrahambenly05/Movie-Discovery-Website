import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getWatchlist, removeFromWatchlist } from "../api/watchlistApi"
import { getMovieDetail } from "../api/movieApi"
import type { MovieDetail } from "../types/movie"

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'
const PLACEHOLDER_IMAGE = 'https://placehold.co/500x750?text=No+Poster'

function WatchlistPage() {
  const [movies, setMovies] = useState<MovieDetail[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadWatchlist = async () => {
    try {
      setLoading(true)
      setError(null)
      const items = await getWatchlist()
      const movieDetails = await Promise.all(
        items.map((item) => getMovieDetail(item.tmdb_movie_id))
      )
      setMovies(movieDetails)
    } catch (err) {
      setError('Failed to load your watchlist. Please try again later.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    loadWatchlist()
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [])

  const handleRemove = async (movieId: number) => {
    try {
      await removeFromWatchlist(movieId)
      setMovies((prev) => prev.filter((movie) => movie.id !== movieId))
    } catch (err) {
      console.error(err)
    }
  }
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-white text-lg"> Loading your watchlist...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">My Watchlist</h1>

        {movies.length === 0 ? (
          <p className="text-gray-400">
            Your watchlist is empty. Start adding movies from their detail page.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {movies.map((movie) => {
              const posterUrl = movie.poster_path
                ? `${IMAGE_BASE_URL}${movie.poster_path}`
                : PLACEHOLDER_IMAGE
              
              return (
                <div
                  key={movie.id}
                  className="bg-gray-800 rounded-lg overflow-hidden"
                >
                  <Link to={`/movie/${movie.id}`}>
                    <img
                      src={posterUrl}
                      alt={movie.title}
                      className="w-full h-auto aspect-[2/3] object-cover"
                    />
                  </Link>
                  <div className="p-3">
                    <h3 className="text-white font-semibold text-sm truncate">
                      {movie.title}
                    </h3>
                    <div className="flex items-center gap-1 mt-1 mb-2">
                      <span className="text-yellow-400 text-xs">★</span>
                      <span className="text-gray-300 text-xs">
                        {movie.vote_average.toFixed(1)}
                      </span>
                    </div>
                    <button
                      onClick={() => handleRemove(movie.id)}
                      className="w-full bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded py-1.5"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default WatchlistPage
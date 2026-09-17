import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getMovieDetail } from '../api/movieApi'
import { getWatchlist, addToWatchlist, removeFromWatchlist } from '../api/watchlistApi'
import type { MovieDetail } from '../types/movie'
import TrailerEmbed from '../components/TrailerEmbed'
import { useAuth } from '../context/useAuth'

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'
const PLACEHOLDER_IMAGE = 'https://placehold.co/500x750?text=No+Poster'

function MovieDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { isLoggedIn } = useAuth()

  const [movie, setMovie] = useState<MovieDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isInWatchlist, setIsInWatchlist] = useState(false)
  const [watchlistLoading, setWatchlistLoading] = useState(false)

  useEffect(() => {
    if (!id) return

    const fetchDetail = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await getMovieDetail(Number(id))
        setMovie(data)

        if (isLoggedIn) {
          const watchlist = await getWatchlist()
          const found = watchlist.some((item) => item.tmdb_movie_id === Number(id))
          setIsInWatchlist(found)
        }
      } catch (err) {
        setError('Failed to load movie details. The movie may not exist.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchDetail()
  }, [id, isLoggedIn])

  const handleWatchlistToggle = async () => {
    if (!id) return
    setWatchlistLoading(true)

    try {
      if (isInWatchlist) {
        await removeFromWatchlist(Number(id))
        setIsInWatchlist(false)
      } else {
        await addToWatchlist(Number(id))
        setIsInWatchlist(true)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setWatchlistLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-white text-lg">Loading movie details...</p>
      </div>
    )
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center gap-4">
        <p className="text-red-500 text-lg">{error ?? 'Movie not found.'}</p>
        <Link to="/" className="text-blue-400 hover:underline">
          Back to Home
        </Link>
      </div>
    )
  }

  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : PLACEHOLDER_IMAGE

  const trailer = movie.videos.find((video) => video.type === 'Trailer')

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          <img
            src={posterUrl}
            alt={movie.title}
            className="w-full md:w-80 rounded-lg object-cover self-start"
          />

          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white">{movie.title}</h1>
            {movie.tagline && (
              <p className="text-gray-400 italic mt-1">{movie.tagline}</p>
            )}

            <div className="flex items-center gap-4 mt-3 text-gray-300">
              <span className="flex items-center gap-1">
                <span className="text-yellow-400">★</span>
                {movie.vote_average.toFixed(1)} ({movie.vote_count} votes)
              </span>
              <span>{movie.released_date}</span>
              {movie.runtime > 0 && <span>{movie.runtime} minutes</span>}
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="bg-gray-700 text-gray-200 text-xs px-3 py-1 rounded-full"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            {isLoggedIn ? (
              <button
                onClick={handleWatchlistToggle}
                disabled={watchlistLoading}
                className={`mt-4 px-5 py-2 rounded-lg font-semibold text-white disabled:opacity-50 ${
                  isInWatchlist
                    ? 'bg-gray-700 hover:bg-gray-600'
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {watchlistLoading
                  ? 'Please wait...'
                  : isInWatchlist
                  ? 'Remove from Watchlist'
                  : 'Add to Watchlist'}
              </button>
            ) : (
              <Link
                to="/login"
                className="inline-block mt-4 px-5 py-2 rounded-lg font-semibold text-white bg-red-600 hover:bg-red-700"
              >
                Login to Add to Watchlist
              </Link>
            )}

            <h2 className="text-xl font-semibold text-white mt-6 mb-2">
              Overview
            </h2>
            <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
          </div>
        </div>

        {trailer && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-white mb-3">Trailer</h2>
            <TrailerEmbed videoKey={trailer.key} />
          </div>
        )}
      </div>
    </div>
  )
}

export default MovieDetailPage
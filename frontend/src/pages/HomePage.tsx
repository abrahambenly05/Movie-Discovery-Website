import { useEffect, useState } from 'react'
import { getTrending, getPopular, getUpcoming, discoverByGenre } from '../api/movieApi'
import type { Movie } from '../types/movie'
import MovieGrid from '../components/MovieGrid'
import GenreFilter, { type GenreSelection } from '../components/GenreFilter'

function HomePage() {
  const [trending, setTrending] = useState<Movie[]>([])
  const [popular, setPopular] = useState<Movie[]>([])
  const [upcoming, setUpcoming] = useState<Movie[]>([])
  const [genreResults, setGenreResults] = useState<Movie[]>([])
  const [selectedGenreId, setSelectedGenreId] = useState<GenreSelection>(null)
  const [loading, setLoading] = useState(true)
  const [genreLoading, setGenreLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    const fetchAllMovies = async () => {
      try {
        setLoading(true)
        const [trendingData, popularData, upcomingData] = await Promise.all([
          getTrending(),
          getPopular(),
          getUpcoming(),
        ])
        setTrending(trendingData.results)
        setPopular(popularData.results)
        setUpcoming(upcomingData.results)
      } catch (err) {
        setError('Failed to load movies. Please try again later.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchAllMovies()
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [])

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    if (typeof selectedGenreId !== 'number') {
      setGenreResults([])
      return
    }

    const fetchByGenre = async () => {
      try {
        setGenreLoading(true)
        const data = await discoverByGenre(selectedGenreId)
        setGenreResults(data.results)
      } catch (err) {
        console.error(err)
      } finally {
        setGenreLoading(false)
      }
    }

    fetchByGenre()
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [selectedGenreId])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-white text-lg">Loading movies...</p>
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
      <GenreFilter
        selectedGenreId={selectedGenreId}
        onSelectGenre={setSelectedGenreId}
      />

      {typeof selectedGenreId === 'number' ? (
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            {genreLoading ? 'Loading...' : 'Filtered Results'}
          </h2>
          {!genreLoading && <MovieGrid movies={genreResults} />}
        </section>
      ) : (
        <>
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">Trending</h2>
            <MovieGrid movies={trending} />
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">Popular</h2>
            <MovieGrid movies={popular} />
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">Upcoming</h2>
            <MovieGrid movies={upcoming} />
          </section>
        </>
      )}
    </div>
  )
}

export default HomePage
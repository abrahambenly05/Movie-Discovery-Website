import { useEffect, useState } from 'react'
import { getTrending, getPopular, getUpcoming } from '../api/movieApi'
import type { Movie } from '../types/movie'
import MovieGrid from '../components/MovieGrid'

function HomePage() {
  const [trending, setTrending] = useState<Movie[]>([])
  const [popular, setPopular] = useState<Movie[]>([])
  const [upcoming, setUpcoming] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
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
  }, [])

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
    </div>
  )
}

export default HomePage
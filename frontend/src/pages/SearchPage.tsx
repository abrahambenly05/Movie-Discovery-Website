import { useEffect, useState } from 'react'
import { searchMovies } from '../api/movieApi'
import type { Movie } from '../types/movie'
import MovieGrid from '../components/MovieGrid'
import useDebounce from '../hooks/useDebounce'

function SearchPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasSearched, setHasSearched] = useState(false)

  const debouncedQuery = useDebounce(query, 500)

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const trimmedQuery = debouncedQuery.trim()

    if (trimmedQuery === '') {
      setResults([])
      setHasSearched(false)
      return
    }

    const fetchResults = async () => {
      try {
        setLoading(true)
        setError(null)
        setHasSearched(true)
        const data = await searchMovies(trimmedQuery)
        setResults(data.results)
      } catch (err) {
        setError('Failed to search movies. Please try again later.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
    
  }, [debouncedQuery])
  /* eslint-enable react-hooks/set-state-in-effect */

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">Search Movies</h1>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie title..."
          className="w-full bg-gray-800 text-white placeholder-gray-500 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
        />

        <div className="mt-8">
          {!hasSearched && (
            <p className="text-gray-400">
              Start typing to search for movies.
            </p>
          )}

          {loading && <p className="text-gray-400">Searching...</p>}

          {error && <p className="text-red-500">{error}</p>}

          {hasSearched && !loading && !error && results.length === 0 && (
            <p className="text-gray-400">No movies found.</p>
          )}

          {!loading && !error && results.length > 0 && (
            <MovieGrid movies={results} />
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchPage
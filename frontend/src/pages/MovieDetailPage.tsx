import { useParams } from 'react-router-dom'

function MovieDetailPage() {
  const { id } = useParams<{ id: string }>()

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold">Movie Detail Page</h1>
      <p className="mt-2 text-gray-400">Movie ID: {id}</p>
    </div>
  )
}

export default MovieDetailPage
import { useEffect, useState } from "react";
import { getGenreListSimple } from "../api/movieApi";

interface Genre {
    id: number
    name: string
}

export type GenreSelection = number | 'all' | null

interface GenreFilterProps {
    selectedGenreId: GenreSelection
    onSelectGenre: (genreId: GenreSelection) => void
}

function GenreFilter({ selectedGenreId, onSelectGenre }: GenreFilterProps) {
    const [genres, setGenres] = useState<Genre[]>([])
    const [genresLoading, setGenresLoading] = useState(true)
    const [isExpanded, setIsExpanded] = useState(false)

    useEffect(() => {
        /* eslint-disable react-hooks/set-state-in-effect */
        const fetchGenres = async () => {
            try {
                const data = await getGenreListSimple()
                setGenres(data)
            } finally {
                setGenresLoading(false)
            }
        }
        fetchGenres()
        /* eslint-enable react-hooks/set-state-in-effect */
    }, [])

    return (
        <div className="mb-6">
            <button
                onClick={() => setIsExpanded((prev) => !prev)}
                className="flex items-center gap-2 text-sm text-gray-300 hover:text-white font-semibold mb-3"
            >
                <span>Filter by Genre</span>
                <span className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                    ▾
                </span>
            </button>

            {isExpanded && (
                genresLoading ? (
                    <p className="text-gray-400 text-xs">Loading genres...</p>
                ) : (
                    <div className="flex flex-wrap gap-2 mb-6">
                        <button
                            onClick={() => onSelectGenre(null)}
                            className={`text-xs px-3 py-1.5 rounded-full font-semibold ${
                                selectedGenreId === null
                                    ? 'bg-red-600 text-white'
                                    : 'bg-gray-700 text-gray-300 hover: bg-gray-600'
                            }`}
                        >
                            All
                        </button>
                        {genres.map((genre) => (
                            <button
                                key={genre.id}
                                onClick={() => onSelectGenre(genre.id)}
                                className={`text=xs px-3 py-1.5 rounded-full font-semibold ${
                                    selectedGenreId === genre.id
                                        ? 'bg-red-600 text-white'
                                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                }`}
                            >
                                {genre.name}
                            </button>
                        ))}
                    </div>
                )
            )}
        </div>
    )
}

export default GenreFilter
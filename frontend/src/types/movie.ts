export interface Movie {
    id: number
    title: string
    original_title: string
    overview: string
    poster_path: string | null
    backdrop_path: string | null
    released_date: string
    vote_average: number
    vote_count: number
    genre_ids: number[]
    popularity: number
    original_language: string
    adult: boolean
}

export interface MovieListResponse {
    page: number
    results: Movie[]
    total_pages: number
    total_results: number
}

export interface Genre {
    id: number
    name: string
}

export interface GenreListResponse {
    genres: Genre[]
}

export interface Video {
    id: string
    key: string
    name: string
    site: string
    type: string
    official: boolean
}

export interface MovieDetail extends Movie {
    genres: Genre[]
    runtime: number
    tagline: string
    videos: Video[]
}
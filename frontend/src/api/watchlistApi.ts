import axiosInstance from "./axiosInstances"

export interface WatchlistItem {
    id: number
    tmdb_movie_id: number
    added_at: string
}

export const getWatchlist = async (): Promise<WatchlistItem[]> => {
    const response = await axiosInstance.get('/watchlist')
    return response.data
}

export const addToWatchlist = async (tmdbMovieId: number): Promise<WatchlistItem> => {
    const response = await axiosInstance.post('/watchlist', {
        tmdb_movie_id: tmdbMovieId,
    })
    return response.data
}

export const removeFromWatchlist = async (tmdbMovieId: number): Promise<void> => {
    await axiosInstance.delete(`/watchlist/${tmdbMovieId}`)
}
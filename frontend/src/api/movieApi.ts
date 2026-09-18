import axiosInstance from './axiosInstances'
import type { MovieListResponse, MovieDetail, GenreListResponse } from '../types/movie'

export const getTrending = async (): Promise<MovieListResponse> => {
    const response = await axiosInstance.get('/movies/trending')
    return response.data
}

export const getPopular = async (): Promise<MovieListResponse> => {
    const response = await axiosInstance.get('/movies/popular')
    return response.data
}

export const getUpcoming = async (): Promise<MovieListResponse> => {
    const response = await axiosInstance.get('/movies/upcoming')
    return response.data
}

export const searchMovies = async (query: string): Promise<MovieListResponse> => {
    const response = await axiosInstance.get('/movies/search', {
        params: {query},
    })
    return response.data
}

export const getMovieDetail = async (movieId: number): Promise<MovieDetail> => {
    const response = await axiosInstance.get(`/movies/${movieId}`)
    return response.data
}

export const getGenres = async (): Promise<GenreListResponse> => {
    const response = await axiosInstance.get('/movies/genres')
    return response.data
}

export const getGenreListSimple = async (): Promise<{ id: number; name: string}[]> => {
    const response = await axiosInstance.get('/movies/genres')
    return response.data.genres
}

export const discoverByGenre = async (genreId: number): Promise<MovieListResponse> => {
    const response = await axiosInstance.get('/movies/discover', {
        params: {  genre_id: genreId },
    })
    return response.data
}
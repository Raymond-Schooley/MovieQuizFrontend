import { apiClient } from './client'
import type { Movie, MovieRequest } from './types'

export function fetchMovies(titleSearch?: string): Promise<Movie[]> {
  const query = titleSearch ? `?title=${encodeURIComponent(titleSearch)}` : ''
  return apiClient.get<Movie[]>(`/movies${query}`)
}

export function fetchMovie(id: number): Promise<Movie> {
  return apiClient.get<Movie>(`/movies/${id}`)
}

export function createMovie(request: MovieRequest): Promise<Movie> {
  return apiClient.post<Movie>('/movies', request)
}

export function deleteMovie(id: number): Promise<void> {
  return apiClient.delete<void>(`/movies/${id}`)
}

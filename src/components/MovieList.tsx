import { useQuery } from '@tanstack/react-query'
import { fetchMovies } from '../api/moviesApi'

export function MovieList() {
  const { data: movies, isLoading, error } = useQuery({
    queryKey: ['movies'],
    queryFn: () => fetchMovies(),
  })

  if (isLoading) return <p>Loading movies...</p>
  if (error) return <p role="alert">Couldn't load movies: {(error as Error).message}</p>

  return (
    <section className="movie-list">
      <h2>Movies in the quiz catalog</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Year</th>
            <th>Rating</th>
            <th>Top-billed cast</th>
          </tr>
        </thead>
        <tbody>
          {movies?.map((movie) => (
            <tr key={movie.id}>
              <td>{movie.title}</td>
              <td>{movie.releaseYear}</td>
              <td>{movie.averageRating ?? '-'}</td>
              <td>{movie.cast.map((c) => c.actorName).join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

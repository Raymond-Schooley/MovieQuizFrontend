import { useState } from 'react'
import { QuizGame } from './components/QuizGame'
import { MovieList } from './components/MovieList'
import { ThemeSwitcher } from './components/ThemeSwitcher'
import './App.css'

type Tab = 'quiz' | 'movies'

export default function App() {
  const [tab, setTab] = useState<Tab>('quiz')

  return (
    <div className="app">
      <nav className="app__tabs">
        <ThemeSwitcher />
        <button
          type="button"
          className={tab === 'quiz' ? 'app__tab app__tab--active' : 'app__tab'}
          onClick={() => setTab('quiz')}
        >
          Quiz
        </button>
        <button
          type="button"
          className={tab === 'movies' ? 'app__tab app__tab--active' : 'app__tab'}
          onClick={() => setTab('movies')}
        >
          Browse Movies
        </button>
      </nav>

      <main className="app__content">{tab === 'quiz' ? <QuizGame /> : <MovieList />}</main>
    </div>
  )
}

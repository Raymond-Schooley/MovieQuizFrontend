// Mirrors the backend DTOs in com.moviequiz.dto - keep these two in sync
// by hand for now; see the root README for the option of generating this
// file from the OpenAPI spec later.

export interface CastMember {
  actorId: number
  actorName: string
  characterName: string | null
  importance: number
}

export interface Movie {
  id: number
  title: string
  releaseYear: number
  runtimeMinutes: number | null
  averageRating: number | null
  numVotes: number
  cast: CastMember[]
}

export interface MovieRequest {
  title: string
  releaseYear: number
  runtimeMinutes?: number
  averageRating?: number
  numVotes: number
}

export interface Actor {
  id: number
  name: string
  birthYear: number | null
  deathYear: number | null
}

export interface ActorRequest {
  name: string
  birthYear?: number
  deathYear?: number
}

export interface QuizOption {
  id: string
  text: string
}

export interface QuizQuestion {
  questionId: string
  questionType: string
  prompt: string
  options: QuizOption[]
}

export interface QuizAnswerRequest {
  questionId: string
  selectedOptionId: string
}

export interface QuizAnswerResult {
  correct: boolean
  correctOptionId: string
  correctAnswerText: string
}

export interface QuizFilters {
  minYear: number
  maxYear: number
  minVotes: number
}

export interface ApiErrorBody {
  timestamp: string
  status: number
  error: string
  message: string
  path: string
  details?: string[]
}

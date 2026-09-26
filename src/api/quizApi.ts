import { apiClient } from './client'
import type { QuizAnswerRequest, QuizAnswerResult, QuizFilters, QuizQuestion } from './types'

export function fetchNextQuestion(filters: QuizFilters): Promise<QuizQuestion> {
  const params = new URLSearchParams({
    minYear: String(filters.minYear),
    maxYear: String(filters.maxYear),
    minVotes: String(filters.minVotes),
  })
  return apiClient.get<QuizQuestion>(`/quiz/questions/next?${params.toString()}`)
}

export function submitAnswer(request: QuizAnswerRequest): Promise<QuizAnswerResult> {
  return apiClient.post<QuizAnswerResult>('/quiz/answers', request)
}

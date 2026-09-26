import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchNextQuestion, submitAnswer } from '../api/quizApi'
import type { QuizAnswerRequest, QuizFilters } from '../api/types'

const DEFAULT_FILTERS: QuizFilters = { minYear: 1970, maxYear: 2030, minVotes: 10000 }

/**
 * Wraps the "get a question" / "submit an answer" flow. `round` is bumped
 * to force a fresh question after each answer, since the same questionId
 * can only be submitted once (the backend invalidates it on answer).
 */
export function useQuiz(filters: QuizFilters = DEFAULT_FILTERS) {
  const queryClient = useQueryClient()

  const questionQuery = useQuery({
    queryKey: ['quiz-question', filters],
    queryFn: () => fetchNextQuestion(filters),
  })

  const answerMutation = useMutation({
    mutationFn: (request: QuizAnswerRequest) => submitAnswer(request),
  })

  function nextQuestion() {
    answerMutation.reset()
    queryClient.invalidateQueries({ queryKey: ['quiz-question', filters] })
  }

  return {
    question: questionQuery.data,
    isLoadingQuestion: questionQuery.isLoading,
    questionError: questionQuery.error,
    submitAnswer: answerMutation.mutate,
    answerResult: answerMutation.data,
    isSubmitting: answerMutation.isPending,
    nextQuestion,
  }
}

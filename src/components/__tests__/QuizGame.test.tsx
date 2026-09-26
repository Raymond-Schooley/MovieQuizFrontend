import type { ReactElement } from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { QuizGame } from '../QuizGame'
import * as quizApi from '../../api/quizApi'
import type { QuizQuestion } from '../../api/types'

vi.mock('../../api/quizApi')

const question: QuizQuestion = {
  questionId: 'q1',
  questionType: 'LEAD_ACTOR',
  prompt: 'Who was the lead actor in "The Matrix" (1999)?',
  options: [
    { id: '1', text: 'Tom Hanks' },
    { id: '2', text: 'Keanu Reeves' },
    { id: '3', text: 'Brad Pitt' },
    { id: '4', text: 'Al Pacino' },
  ],
}

function renderWithClient(ui: ReactElement) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return render(<QueryClientProvider client={client}>{ui}</QueryClientProvider>)
}

describe('QuizGame', () => {
  beforeEach(() => {
    vi.mocked(quizApi.fetchNextQuestion).mockResolvedValue(question)
    vi.mocked(quizApi.submitAnswer).mockResolvedValue({
      correct: true,
      correctOptionId: '2',
      correctAnswerText: 'Keanu Reeves',
    })
  })

  it('loads a question, submits an answer, and updates the score', async () => {
    const user = userEvent.setup()
    renderWithClient(<QuizGame />)

    expect(await screen.findByText(question.prompt)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Keanu Reeves' }))

    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('Correct!'))
    expect(screen.getByLabelText('score')).toHaveTextContent('1 / 1')
    expect(screen.getByRole('button', { name: 'Next question' })).toBeInTheDocument()
  })
})

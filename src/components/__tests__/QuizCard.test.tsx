import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { QuizCard } from '../QuizCard'
import type { QuizQuestion } from '../../api/types'

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

describe('QuizCard', () => {
  it('renders the prompt and all options, and reports the chosen option', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()

    render(<QuizCard question={question} onSelect={onSelect} disabled={false} />)

    expect(screen.getByText(question.prompt)).toBeInTheDocument()
    for (const option of question.options) {
      expect(screen.getByRole('button', { name: option.text })).toBeInTheDocument()
    }

    await user.click(screen.getByRole('button', { name: 'Keanu Reeves' }))
    expect(onSelect).toHaveBeenCalledWith(question.options[1])
  })

  it('shows feedback once an answer result is available', () => {
    render(
      <QuizCard
        question={question}
        selectedOptionId="1"
        answerResult={{ correct: false, correctOptionId: '2', correctAnswerText: 'Keanu Reeves' }}
        onSelect={vi.fn()}
        disabled
      />,
    )

    expect(screen.getByRole('status')).toHaveTextContent('Keanu Reeves')
    expect(screen.getByRole('button', { name: 'Tom Hanks' })).toBeDisabled()
  })
})

import type { QuizAnswerResult, QuizOption, QuizQuestion } from '../api/types'

interface QuizCardProps {
  question: QuizQuestion
  selectedOptionId?: string
  answerResult?: QuizAnswerResult
  //Is this why my text doesn't appear correctly?
  onSelect: (option: QuizOption) => void
  disabled: boolean
}

export function QuizCard({ question, selectedOptionId, answerResult, onSelect, disabled }: QuizCardProps) {
  return (
    <div className="quiz-card">
      <p className="quiz-card__prompt">{question.prompt}</p>
      <div className="quiz-card__options">
        {question.options.map((option) => {
          const isSelected = option.id === selectedOptionId
          const isCorrectOption = answerResult && option.id === answerResult.correctOptionId
          const isWrongSelection = answerResult && isSelected && !answerResult.correct

          let variant = ''
          if (answerResult) {
            if (isCorrectOption) variant = 'quiz-card__option--correct'
            else if (isWrongSelection) variant = 'quiz-card__option--incorrect'
          } else if (isSelected) {
            variant = 'quiz-card__option--selected'
          }

          return (
            <button
              key={option.id}
              type="button"
              className={`quiz-card__option ${variant}`}
              onClick={() => onSelect(option)}
              disabled={disabled}
            >
              {option.text}
            </button>
          )
        })}
      </div>
      {answerResult && (
        <p
          className={answerResult.correct ? 'quiz-card__feedback quiz-card__feedback--correct' : 'quiz-card__feedback quiz-card__feedback--incorrect'}
          role="status"
        >
          {answerResult.correct ? 'Correct!' : `Not quite - the answer was "${answerResult.correctAnswerText}".`}
        </p>
      )}
    </div>
  )
}

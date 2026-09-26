import { useState } from 'react'
import { useQuiz } from '../hooks/useQuiz'
import type { QuizOption } from '../api/types'
import { QuizCard } from './QuizCard'
import { ScoreBoard } from './ScoreBoard'

export function QuizGame() {
  const { question, isLoadingQuestion, questionError, submitAnswer, answerResult, isSubmitting, nextQuestion } =
    useQuiz()
  const [selectedOptionId, setSelectedOptionId] = useState<string>()
  const [score, setScore] = useState({ correct: 0, answered: 0 })

  function handleSelect(option: QuizOption) {
    if (!question || answerResult) return
    setSelectedOptionId(option.id)
    submitAnswer(
      { questionId: question.questionId, selectedOptionId: option.id },
      {
        onSuccess: (result) => {
          setScore((prev) => ({
            correct: prev.correct + (result.correct ? 1 : 0),
            answered: prev.answered + 1,
          }))
        },
      },
    )
  }

  function handleNext() {
    setSelectedOptionId(undefined)
    nextQuestion()
  }

  return (
    <section className="quiz-game">
      <header className="quiz-game__header">
        <h1>Movie Quiz PunkAss!!</h1>
        <ScoreBoard correct={score.correct} answered={score.answered} />
      </header>

      {isLoadingQuestion && <p>Loading a question...</p>}

      {questionError && (
        <p role="alert" className="quiz-game__error">
          Couldn't load a question: {(questionError as Error).message}
        </p>
      )}

      {question && (
        <QuizCard
          question={question}
          selectedOptionId={selectedOptionId}
          answerResult={answerResult}
          onSelect={handleSelect}
          disabled={isSubmitting || Boolean(answerResult)}
        />
      )}

      {answerResult && (
        <button type="button" className="quiz-game__next" onClick={handleNext}>
          Next question
        </button>
      )}
    </section>
  )
}

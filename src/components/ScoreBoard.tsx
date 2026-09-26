interface ScoreBoardProps {
  correct: number
  answered: number
}

export function ScoreBoard({ correct, answered }: ScoreBoardProps) {
  const pct = answered === 0 ? 0 : Math.round((correct / answered) * 100)
  return (
    <div className="score-board" aria-label="score">
      <span>
        {correct} / {answered}
      </span>
      <span className="score-board__pct">{pct}%</span>
    </div>
  )
}

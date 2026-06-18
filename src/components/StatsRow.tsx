interface StatsRowProps {
  score: number
  total: number
  accuracy: number | null
}

export function StatsRow({ score, total, accuracy }: StatsRowProps) {
  return (
    <div className="stats-row">
      <div className="stat-card">
        <span className="stat-val">{score}</span>
        <span className="stat-label">Acertos</span>
      </div>
      <div className="stat-card">
        <span className="stat-val">{total}</span>
        <span className="stat-label">Rodadas</span>
      </div>
      <div className="stat-card">
        <span className="stat-val">{accuracy !== null ? `${accuracy}%` : '—'}</span>
        <span className="stat-label">Precisão</span>
      </div>
    </div>
  )
}

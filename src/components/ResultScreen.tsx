import { useState } from 'react'
import type { AnswerRecord } from '../types'

interface ResultScreenProps {
  score: number
  total: number
  history: AnswerRecord[]
  onPlayAgain: () => void
  onHome: () => void
}

export function ResultScreen({ score, total, history, onPlayAgain, onHome }: ResultScreenProps) {
  const accuracy = Math.round((score / total) * 100)
  const [showHistory, setShowHistory] = useState(false)

  let message = ''
  if (accuracy === 100) message = 'Perfeito! Você é um verdadeiro invocador!'
  else if (accuracy >= 80) message = 'Impressionante! Conhecimento de alto elo!'
  else if (accuracy >= 60) message = 'Bom trabalho! Está no caminho certo.'
  else if (accuracy >= 40) message = 'Não foi mal, mas dá pra melhorar!'
  else message = 'Precisa jogar mais LoL...'

  const correct = history.filter((r) => r.correct)
  const wrong = history.filter((r) => !r.correct)

  return (
    <div className="app result-screen">
      <h1 className="home-title">Resultado</h1>
      <p className="result-message">{message}</p>

      <div className="result-stats">
        <div className="result-stat-item">
          <span className="result-stat-val">{score}/{total}</span>
          <span className="result-stat-label">Acertos</span>
        </div>
        <div className="result-stat-item">
          <span className="result-stat-val">{accuracy}%</span>
          <span className="result-stat-label">Precisão</span>
        </div>
      </div>

      <button
        className="history-toggle"
        onClick={() => setShowHistory(!showHistory)}
      >
        {showHistory ? 'Esconder histórico ▲' : 'Ver histórico ▼'}
      </button>

      {showHistory && (
        <div className="history-section">
          {correct.length > 0 && (
            <div className="history-group">
              <h3 className="history-title correct">✓ Acertou ({correct.length})</h3>
              <div className="history-list">
                {correct.map((r, i) => (
                  <span key={i} className="history-tag correct">{r.champion.name}</span>
                ))}
              </div>
            </div>
          )}

          {wrong.length > 0 && (
            <div className="history-group">
              <h3 className="history-title wrong">✗ Errou ({wrong.length})</h3>
              <div className="history-list">
                {wrong.map((r, i) => (
                  <span key={i} className="history-tag wrong">{r.champion.name}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="result-actions">
        <button className="play-btn" onClick={onPlayAgain}>Jogar novamente</button>
        <button className="quit-home-btn" onClick={onHome}>Voltar ao início</button>
      </div>
    </div>
  )
}

import { useState } from 'react'

const ROUND_OPTIONS = [10, 30, 50, 75, 100] as const

interface HomeScreenProps {
  onPlay: (totalRounds: number) => void
}

export function HomeScreen({ onPlay }: HomeScreenProps) {
  const [selectedRounds, setSelectedRounds] = useState(30)

  return (
    <div className="app home-screen">
      <div className="home-content">
        <h1 className="home-title">LoL Quiz</h1>
        <p className="home-desc">Reconheça o campeão em um piscar de olhos</p>

        <div className="rounds-selector">
          <p className="rounds-label">Quantidade de rodadas</p>
          <div className="rounds-options">
            {ROUND_OPTIONS.map((n) => (
              <button
                key={n}
                className={`rounds-btn ${selectedRounds === n ? 'active' : ''}`}
                onClick={() => setSelectedRounds(n)}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <button className="play-btn" onClick={() => onPlay(selectedRounds)}>Jogar</button>
      </div>
    </div>
  )
}

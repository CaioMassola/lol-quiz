import { useState, useMemo } from 'react'
import { SPLASH_URL } from '../constants'
import type { Champion } from '../types'

const ROUND_OPTIONS = [10, 30, 50, 75, 100] as const

interface HomeScreenProps {
  onPlay: (totalRounds: number) => void
  champions: Champion[]
}

export function HomeScreen({ onPlay, champions }: HomeScreenProps) {
  const [selectedRounds, setSelectedRounds] = useState(30)

  const bgChamp = useMemo(() => {
    if (champions.length === 0) return null
    return champions[Math.floor(Math.random() * champions.length)]
  }, [champions])

  return (
    <div className="app home-screen">
      {bgChamp && (
        <div
          className="home-bg"
          style={{ backgroundImage: `url(${SPLASH_URL(bgChamp.id)})` }}
        />
      )}
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

import { useState } from 'react'
import './App.scss'
import { useChampions } from './hooks/useChampions'
import { HomeScreen } from './components/HomeScreen'
import { GameScreen } from './components/GameScreen'
import { ResultScreen } from './components/ResultScreen'
import type { AnswerRecord } from './types'

type Screen = 'home' | 'game' | 'result'

interface GameResult {
  score: number
  total: number
  history: AnswerRecord[]
}

function Footer() {
  return (
    <footer className="app-footer">
      <span>Desenvolvido por Caio Massola</span>
      <a href="https://github.com/CaioMassola" target="_blank" rel="noopener noreferrer">
        <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
        </svg>
        CaioMassola
      </a>
    </footer>
  )
}

export default function App() {
  const { champions, version, loading, error } = useChampions()
  const [screen, setScreen] = useState<Screen>('home')
  const [totalRounds, setTotalRounds] = useState(30)
  const [gameResult, setGameResult] = useState<GameResult>({ score: 0, total: 0, history: [] })

  const handlePlay = (rounds: number) => {
    setTotalRounds(rounds)
    setScreen('game')
  }

  const handleFinish = (score: number, total: number, history: AnswerRecord[]) => {
    setGameResult({ score, total, history })
    setScreen('result')
  }

  if (loading) {
    return (
      <>
        <div className="page-center">
          <div className="spinner" />
          <p>Carregando campeões...</p>
        </div>
        <Footer />
      </>
    )
  }

  if (error) {
    return (
      <>
        <div className="page-center error-msg">{error}</div>
        <Footer />
      </>
    )
  }

  return (
    <>
      {screen === 'home' && <HomeScreen onPlay={handlePlay} champions={champions} />}
      {screen === 'game' && (
        <GameScreen
          key={Date.now()}
          champions={champions}
          version={version}
          totalRounds={totalRounds}
          onQuit={() => setScreen('home')}
          onFinish={handleFinish}
        />
      )}
      {screen === 'result' && (
        <ResultScreen
          score={gameResult.score}
          total={gameResult.total}
          history={gameResult.history}
          onPlayAgain={() => setScreen('game')}
          onHome={() => setScreen('home')}
        />
      )}
      <Footer />
    </>
  )
}

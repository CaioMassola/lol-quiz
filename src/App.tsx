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
      <div className="page-center">
        <div className="spinner" />
        <p>Carregando campeões...</p>
      </div>
    )
  }

  if (error) {
    return <div className="page-center error-msg">{error}</div>
  }

  if (screen === 'home') {
    return <HomeScreen onPlay={handlePlay} />
  }

  if (screen === 'result') {
    return (
      <ResultScreen
        score={gameResult.score}
        total={gameResult.total}
        history={gameResult.history}
        onPlayAgain={() => setScreen('game')}
        onHome={() => setScreen('home')}
      />
    )
  }

  return (
    <GameScreen
      key={Date.now()}
      champions={champions}
      version={version}
      totalRounds={totalRounds}
      onQuit={() => setScreen('home')}
      onFinish={handleFinish}
    />
  )
}

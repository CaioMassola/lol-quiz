import { useState, useCallback, useEffect, useRef } from 'react'
import { CHAMP_IMG_URL, FLASH_MS, ANSWER_MS, REVEAL_MS } from '../constants'
import { shuffle, preloadImage } from '../utils'
import { StatsRow } from './StatsRow'
import { TimerBar } from './TimerBar'
import { ChampionDisplay } from './ChampionDisplay'
import { OptionButton } from './OptionButton'
import type { Champion, Round, Phase, Result, AnswerRecord } from '../types'

interface GameScreenProps {
  champions: Champion[]
  version: string
  totalRounds: number
  onQuit: () => void
  onFinish: (score: number, total: number, history: AnswerRecord[]) => void
}

export function GameScreen({ champions, version, totalRounds, onQuit, onFinish }: GameScreenProps) {
  const [round, setRound] = useState<Round | null>(null)
  const [phase, setPhase] = useState<Phase>('loading')
  const [result, setResult] = useState<Result>(null)
  const [selected, setSelected] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [total, setTotal] = useState(0)
  const [timerKey, setTimerKey] = useState(0)

  const scoreRef = useRef(0)
  const totalRef = useRef(0)
  const historyRef = useRef<AnswerRecord[]>([])

  const startRound = useCallback(() => {
    if (champions.length < 4) return
    const pool = shuffle(champions)
    const correct = pool[0]
    const options = shuffle([correct, ...pool.slice(1, 4)])
    setRound({ correct, options })
    setPhase('loading')
    setResult(null)
    setSelected(null)

    preloadImage(CHAMP_IMG_URL(version, correct.id)).then(() => {
      setPhase('flash')
      setTimeout(() => {
        setPhase('hidden')
        setTimerKey((k) => k + 1)
      }, FLASH_MS)
    })
  }, [champions, version])

  const advanceOrFinish = useCallback(() => {
    if (totalRef.current >= totalRounds) {
      onFinish(scoreRef.current, totalRef.current, historyRef.current)
    } else {
      startRound()
    }
  }, [totalRounds, startRound, onFinish])

  useEffect(() => {
    startRound()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleAnswerTimeout = useCallback(() => {
    if (phase !== 'hidden' || !round) return
    historyRef.current.push({ champion: round.correct, correct: false })
    totalRef.current += 1
    setTotal(totalRef.current)
    setResult('wrong')
    setPhase('revealed')
    setTimeout(advanceOrFinish, REVEAL_MS)
  }, [phase, round, advanceOrFinish])

  const handleAnswer = useCallback(
    (champ: Champion) => {
      if (phase !== 'hidden' || !round) return
      setSelected(champ.id)
      const isCorrect = champ.id === round.correct.id
      historyRef.current.push({ champion: round.correct, correct: isCorrect })
      if (isCorrect) {
        scoreRef.current += 1
        setScore(scoreRef.current)
      }
      totalRef.current += 1
      setTotal(totalRef.current)
      setResult(isCorrect ? 'correct' : 'wrong')
      setPhase('revealed')
      setTimeout(advanceOrFinish, REVEAL_MS)
    },
    [phase, round, advanceOrFinish]
  )

  const accuracy = total > 0 ? Math.round((score / total) * 100) : null

  if (!round) return null

  return (
    <div className="app">
      <header className="app-header">
        <button className="quit-btn" onClick={onQuit}>✕</button>
        <h1>LoL Quiz</h1>
        <p className="subtitle">{total}/{totalRounds}</p>
      </header>

      <StatsRow score={score} total={total} accuracy={accuracy} />

      <TimerBar
        key={timerKey}
        running={phase === 'hidden'}
        duration={ANSWER_MS}
        onEnd={handleAnswerTimeout}
      />

      <ChampionDisplay
        phase={phase}
        result={result}
        round={round}
        version={version}
        selected={selected}
      />

      {(phase === 'hidden' || phase === 'revealed') && (
        <div className="options-grid">
          {round.options.map((champ) => {
            let state: 'correct' | 'wrong' | null = null
            if (phase === 'revealed') {
              if (champ.id === round.correct.id) state = 'correct'
              else if (champ.id === selected) state = 'wrong'
            }
            return (
              <OptionButton
                key={champ.id}
                champ={champ}
                state={state}
                onClick={() => handleAnswer(champ)}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

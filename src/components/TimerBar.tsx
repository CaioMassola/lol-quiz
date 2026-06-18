import { useState, useEffect, useRef } from 'react'

interface TimerBarProps {
  running: boolean
  duration: number
  onEnd: () => void
}

export function TimerBar({ running, duration, onEnd }: TimerBarProps) {
  const [progress, setProgress] = useState(1)
  const rafRef = useRef<number>(0)
  const startRef = useRef<number | null>(null)

  useEffect(() => {
    if (!running) {
      setProgress(1)
      cancelAnimationFrame(rafRef.current)
      return
    }
    startRef.current = null

    function tick(ts: number) {
      if (!startRef.current) startRef.current = ts
      const elapsed = ts - startRef.current
      const p = Math.max(0, 1 - elapsed / duration)
      setProgress(p)
      if (p > 0) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        onEnd()
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [running, duration, onEnd])

  const color = progress > 0.6 ? '#1D9E75' : progress > 0.3 ? '#EF9F27' : '#E24B4A'

  return (
    <div className="timer-track">
      <div
        className="timer-fill"
        style={{ width: `${progress * 100}%`, background: color, transition: 'background 0.3s' }}
      />
    </div>
  )
}

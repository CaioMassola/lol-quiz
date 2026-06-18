import { CHAMP_IMG_URL, SPLASH_URL } from '../constants'
import type { Phase, Result, Round } from '../types'

interface ChampionDisplayProps {
  phase: Phase
  result: Result
  round: Round
  version: string
  selected: string | null
}

export function ChampionDisplay({ phase, result, round, version, selected }: ChampionDisplayProps) {
  return (
    <div className="champ-area">
      <div className={`champ-img-wrap ${result || ''}`}>
        {phase === 'loading' && (
          <div className="champ-hidden">
            <div className="spinner" />
          </div>
        )}
        {phase === 'flash' && (
          <img
            className="champ-img"
            src={CHAMP_IMG_URL(version, round.correct.id)}
            alt="Campeão misterioso"
          />
        )}
        {phase === 'hidden' && (
          <div className="champ-hidden" />
        )}
        {phase === 'revealed' && (
          <>
            <img
              className="champ-img splash"
              src={SPLASH_URL(round.correct.id)}
              alt={round.correct.name}
            />
            <div className={`result-overlay ${result}`}>
              {result === 'correct' ? '✓' : '✗'}
            </div>
          </>
        )}
      </div>

      {phase === 'revealed' && (
        <p className="result-label">
          {result === 'correct' && `Correto! Era ${round.correct.name}.`}
          {result === 'wrong' && selected && `Errado! Era ${round.correct.name}.`}
          {result === 'wrong' && !selected && `Tempo esgotado! Era ${round.correct.name}.`}
        </p>
      )}

      {phase === 'hidden' && (
        <p className="result-label">Quem era esse campeão?</p>
      )}
    </div>
  )
}

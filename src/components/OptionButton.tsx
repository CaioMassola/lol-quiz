import type { Champion } from '../types'

interface OptionButtonProps {
  champ: Champion
  state: 'correct' | 'wrong' | null
  onClick: () => void
}

export function OptionButton({ champ, state, onClick }: OptionButtonProps) {
  const cls = ['opt-btn', state].filter(Boolean).join(' ')
  return (
    <button className={cls} onClick={onClick} disabled={state !== null}>
      {champ.name}
    </button>
  )
}

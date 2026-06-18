export interface Champion {
  id: string
  name: string
}

export interface Round {
  correct: Champion
  options: Champion[]
}

export interface AnswerRecord {
  champion: Champion
  correct: boolean
}

export type Phase = 'loading' | 'flash' | 'hidden' | 'revealed'
export type Result = 'correct' | 'wrong' | null

import { BLACKJACK_CARD_VALUES, MAX_HAND_VALUE } from '../constants'
import { BlackjackCard, CARD_NAME } from '../types'

export const getBlackjackValues = (name: CARD_NAME) =>
  BLACKJACK_CARD_VALUES.get(name)

export const getHandValues = (cards: BlackjackCard[]) =>
  cards
    .reduce(
      (totals, card) =>
        totals.flatMap((total) => card.values.map((value) => total + value)),
      [0]
    )
    .reverse()

export const getHandValue = (cards: BlackjackCard[]) => {
  const totals = getHandValues(cards)
  return totals.find((t) => t <= MAX_HAND_VALUE) || totals[totals.length - 1]
}

export function shuffle<T>(array: T[]): T[] {
  const a = [...array]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

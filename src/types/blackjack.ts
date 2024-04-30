import { CARD_NAME } from './playingCards.ts'

export const BLACKJACK_CARD_VALUES: Map<CARD_NAME, number[]> = new Map([
  ['ACE', [1, 11]],
  ['TWO', [2]],
  ['THREE', [3]],
  ['FOUR', [4]],
  ['FIVE', [5]],
  ['SIX', [6]],
  ['SEVEN', [7]],
  ['EIGHT', [8]],
  ['NINE', [9]],
  ['TEN', [10]],
  ['JACK', [10]],
  ['QUEEN', [10]],
  ['KING', [10]]
])

export const getBlackjackValues = (name: CARD_NAME) =>
  BLACKJACK_CARD_VALUES.get(name)

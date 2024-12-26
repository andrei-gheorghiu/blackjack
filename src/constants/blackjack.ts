import { CARD_NAME, CARD_SYMBOLS, NAME_SYMBOLS } from '../types'

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

export const MAX_HAND_VALUE = 21
export const MIN_HAND_LENGTH = 2
export const MIN_DEALER_VALUE = 17
export const DECKS = 1
export const DECK_LENGTH = CARD_SYMBOLS.length * NAME_SYMBOLS.length
export const DEALER = {
  name: 'Dealer',
  cards: [],
  isDealer: true
}
export const DEFAULT_STATE = {
  cards: [],
  cardIds: [],
  decks: DECKS,
  currentPlayerIndex: 0,
  hasGameEnded: false
}

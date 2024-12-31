import { CARD_NAME } from '../types'

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
export const BLACKJACK_MAX_HAND_VALUE = 21
export const BLACKJACK_MIN_HAND_LENGTH = 2
export const BLACKJACK_MIN_DEALER_VALUE = 17
export const BLACKJACK_DECKS = 4
export const BLACKJACK_DEALER = {
  name: 'Dealer',
  isDealer: true
}
export const BLACKJACK_DEFAULT_STATE = {
  cards: [],
  cardIds: [],
  decks: BLACKJACK_DECKS,
  currentPlayerIndex: 0,
  hasGameEnded: false
}

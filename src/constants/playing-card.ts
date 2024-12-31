import { CARD_COLOR, CARD_NAME } from '../types'

export const CardNames = Object.freeze({
  ACE: 'A',
  TWO: '2',
  THREE: '3',
  FOUR: '4',
  FIVE: '5',
  SIX: '6',
  SEVEN: '7',
  EIGHT: '8',
  NINE: '9',
  TEN: '10',
  JACK: 'J',
  QUEEN: 'Q',
  KING: 'K'
})
export const CARD_NAMES = Object.keys(CardNames) as CARD_NAME[]
export const NAME_SYMBOLS = Object.values(CardNames)

export const CardColors = Object.freeze({
  SPADES: '♠',
  HEARTS: '♥',
  DIAMONDS: '♦',
  CLUBS: '♣'
})
export const CARD_COLORS = Object.keys(CardColors) as CARD_COLOR[]
export const COLOR_SYMBOLS = Object.values(CardColors)

export const DECK_LENGTH = COLOR_SYMBOLS.length * NAME_SYMBOLS.length

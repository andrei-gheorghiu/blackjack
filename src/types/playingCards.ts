export const CardNames = {
  ACE: 'ACE',
  TWO: 'TWO',
  THREE: 'THREE',
  FOUR: 'FOUR',
  FIVE: 'FIVE',
  SIX: 'SIX',
  SEVEN: 'SEVEN',
  EIGHT: 'EIGHT',
  NINE: 'NINE',
  TEN: 'TEN',
  JACK: 'JACK',
  QUEEN: 'QUEEN',
  KING: 'KING'
} as const
export type CARD_NAME = (typeof CardNames)[keyof typeof CardNames]
export const CARD_NAMES: CARD_NAME[] = [
  'ACE',
  'TWO',
  'THREE',
  'FOUR',
  'FIVE',
  'SIX',
  'SEVEN',
  'EIGHT',
  'NINE',
  'TEN',
  'JACK',
  'QUEEN',
  'KING'
]
export const NAME_SYMBOL: Record<CARD_NAME, string> = {
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
}

export const CardColors = {
  SPADES: 'SPADES',
  HEARTS: 'HEARTS',
  DIAMONDS: 'DIAMONDS',
  CLUBS: 'CLUBS'
} as const
export type CARD_COLOR = (typeof CardColors)[keyof typeof CardColors]
export const CARD_COLORS: CARD_COLOR[] = [
  'SPADES',
  'HEARTS',
  'DIAMONDS',
  'CLUBS'
]
export const COLOR_SYMBOL: Record<CARD_COLOR, string> = {
  SPADES: '♠',
  HEARTS: '♥',
  DIAMONDS: '♦',
  CLUBS: '♣'
}

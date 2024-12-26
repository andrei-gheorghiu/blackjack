import { CardColors, CardNames } from '../constants'

export type CARD_NAME = keyof typeof CardNames
export const CARD_NAMES = Object.keys(CardNames) as CARD_NAME[]
export const NAME_SYMBOLS = Object.values(CardNames)

export type CARD_COLOR = keyof typeof CardColors
export const CARD_COLORS = Object.keys(CardColors) as CARD_COLOR[]
export const CARD_SYMBOLS = Object.values(CardColors)

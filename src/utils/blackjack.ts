import { BLACKJACK_CARD_VALUES } from '../constants'
import { CARD_NAME } from '../types'

export const getBlackjackValues = (name: CARD_NAME) =>
  BLACKJACK_CARD_VALUES.get(name)

import { IPlayingCard, PlayingCard } from './PlayingCard.ts'
import { getBlackjackValues } from './blackjack.ts'

export class BlackjackCard extends PlayingCard {
  values: number[]
  constructor(data: IPlayingCard | BlackjackCard) {
    super(data)
    this.values = getBlackjackValues(this.name) || []
  }
}

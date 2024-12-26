import { IPlayingCard, PlayingCard } from './PlayingCard.ts'
import { getBlackjackValues } from '../utils'

export class BlackjackCard extends PlayingCard {
  values: number[]
  constructor(data: IPlayingCard | BlackjackCard) {
    super(data)
    this.values = getBlackjackValues(this.name) || []
  }
}

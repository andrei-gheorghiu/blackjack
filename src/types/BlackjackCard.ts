import { getBlackjackValues } from '../utils'
import { IPlayingCard, PlayingCard } from './PlayingCard.ts'

export class BlackjackCard extends PlayingCard {
  values: number[]
  constructor(data: IPlayingCard | BlackjackCard) {
    super(data)
    this.values = getBlackjackValues(this.name)
  }
}

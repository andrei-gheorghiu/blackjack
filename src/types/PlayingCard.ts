import { CARD_COLOR, CARD_NAME } from './playing-card.ts'
import { v4 } from 'uuid'

export interface IPlayingCard {
  name: CARD_NAME
  color: CARD_COLOR
  id?: string
}

export class PlayingCard implements IPlayingCard {
  name!: CARD_NAME
  color!: CARD_COLOR
  id = ''

  constructor(props: IPlayingCard | PlayingCard) {
    if (props instanceof PlayingCard) return props
    Object.assign(this, props)
    if (!this.id) this.id = v4()
  }
}

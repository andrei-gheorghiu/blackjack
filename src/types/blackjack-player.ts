export interface IBlackjackPlayer {
  hands?: string[][]
  name: string
  isDealer?: boolean
}

export class BlackjackPlayer implements IBlackjackPlayer {
  name!: string
  isDealer = false
  currentHandIndex = 0
  hands: string[][] = [[]]
  constructor(data: IBlackjackPlayer) {
    Object.assign(this, data)
  }

  get hand() {
    return this.hands[this.currentHandIndex] || []
  }

  get allCards() {
    return this.hands.flat()
  }

  reset() {
    Object.assign(this, {
      hands: [[]],
      currentHandIndex: 0
    })
  }

  splitHand() {
    this.hands.splice(this.currentHandIndex, 1, [this.hand[0]], [this.hand[1]])
  }
}

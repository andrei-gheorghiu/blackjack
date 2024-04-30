import { defineStore } from 'pinia'
import { BlackjackCard, CARD_COLORS, CARD_NAMES } from '../types'
import { faker } from '@faker-js/faker'

export interface BlackjackState {
  cards: BlackjackCard[]
  cardIds: string[]
  players: BlackjackPlayer[]
  decks: number
  currentPlayerIndex: number
  hasGameEnded: boolean
}

export interface BlackjackPlayer {
  cards: string[]
  name: string
  isDealer?: boolean
}

const MAX_HAND_VALUE = 21
const MIN_HAND_LENGTH = 2
const MIN_DEALER_VALUE = 17
const DECKS = 1
const DECK_LENGTH = CARD_COLORS.length * CARD_NAMES.length
export const DEALER = {
  name: 'Dealer',
  cards: [],
  isDealer: true
}
export const DEFAULT_STATE = {
  cards: [],
  cardIds: [],
  decks: DECKS,
  currentPlayerIndex: 0,
  hasGameEnded: false
}
export const useBlackJack = defineStore('blackjack', {
  state: (): BlackjackState => ({
    ...DEFAULT_STATE,
    players: [
      {
        name: 'Player 1',
        cards: []
      },
      {
        name: 'Player 2',
        cards: []
      },
      {
        name: 'Player 3',
        cards: []
      },
      DEALER
    ]
  }),
  actions: {
    generateCards() {
      Array.from({ length: this.decks }).forEach(() => {
        CARD_COLORS.forEach((color) => {
          CARD_NAMES.forEach((name) => {
            this.cards.push(
              new BlackjackCard({
                color,
                name
              })
            )
          })
        })
      })
    },
    getCard(uuid: string) {
      return this.cards.find(({ id }) => uuid === id) as BlackjackCard
    },
    reset() {
      this.players.forEach((p) => (p.cards = []))
      Object.assign(this, { ...DEFAULT_STATE })
    },
    newGame(decks?: number) {
      this.reset()
      if (decks && isFinite(decks)) {
        this.decks = decks
      }
      if (this.cards.length !== this.decks * DECK_LENGTH) {
        this.generateCards()
      }
      this.shuffle()
      this.dealCard()
    },
    shuffle() {
      this.cardIds = faker.helpers.shuffle(this.cards.map(({ id }) => id))
    },
    dealCard() {
      this.currentPlayer.cards.push(this.nextCardId)
      if (this.isDealing) {
        this.advanceTurn()
        this.dealCard()
      } else {
        if (this.currentPlayer.isDealer) {
          if (this.hasGameEnded) {
            !this.isBusted(this.currentPlayer) && this.playDealerTurn()
          } else {
            this.advanceTurn()
          }
        } else {
          this.isBusted(this.currentPlayer) && this.advanceTurn()
        }
      }
    },
    advanceTurn() {
      this.currentPlayerIndex =
        (this.players.length + this.currentPlayerIndex + 1) %
        this.players.length

      if (this.currentPlayer.isDealer) {
        !this.isDealing && this.playDealerTurn()
      } else {
        this.hasBlackjack(this.currentPlayer) && this.advanceTurn()
      }
    },
    playDealerTurn() {
      const totals = getHandValues(this.currentPlayer.cards.map(this.getCard))
      this.hasGameEnded = true
      if (!totals.filter((t) => t >= MIN_DEALER_VALUE).length) {
        this.dealCard()
      }
    }
  },
  getters: {
    currentPlayer(): BlackjackPlayer {
      return this.players[this.currentPlayerIndex]
    },
    isCurrentPlayer() {
      return (p: BlackjackPlayer): boolean =>
        p.name === this.currentPlayer?.name
    },
    isBusted() {
      return (player: BlackjackPlayer): boolean =>
        !getHandValues(player.cards.map(useBlackJack().getCard)).length
    },
    dealtCardIds(): string[] {
      return this.players.map((player) => player.cards).flat()
    },
    nextCardId(): string {
      return this.cardIds.filter((id) => !this.dealtCardIds.includes(id))[0]
    },
    isDealing(): boolean {
      return this.players.some(
        (player) => player.cards.length < MIN_HAND_LENGTH
      )
    },
    dealer(): BlackjackPlayer {
      return this.players.find((p) => p.isDealer) as BlackjackPlayer
    },
    isCardTurned() {
      return (cardId: string): boolean =>
        this.currentPlayer.cards.includes(cardId) ||
        this.dealer.cards.findIndex((id) => id === cardId) > 0
    },
    gameResult() {
      const dealerHand = this.getPlayerCards(this.dealer)
      return (p: BlackjackPlayer): string => {
        const playerHand = this.getPlayerCards(p)
        switch (true) {
          case !getHandValue(playerHand):
          case getHandValue(playerHand) < getHandValue(dealerHand):
          case this.hasBlackjack(this.dealer) && !this.hasBlackjack(p):
            return 'Loss'
          case this.hasBlackjack(p) && !this.hasBlackjack(this.dealer):
            return 'Win'
          case getHandValue(playerHand) === getHandValue(dealerHand):
            return 'Draw'
          default:
            return 'Win'
        }
      }
    },
    getPlayerCards() {
      return (p: BlackjackPlayer): BlackjackCard[] =>
        p.cards.map(useBlackJack().getCard)
    },
    hasMaxHandValue() {
      return (p: BlackjackPlayer): boolean =>
        getHandValue(this.getPlayerCards(p)) === MAX_HAND_VALUE
    },
    hasBlackjack() {
      return (p: BlackjackPlayer): boolean =>
        p.cards.length === 2 && this.hasMaxHandValue(p)
    },
    getPlayerHandValue() {
      return (p: BlackjackPlayer): number =>
        getHandValue(this.getPlayerCards(p))
    }
  }
})

const getHandValues = (cards: BlackjackCard[]) =>
  cards
    .reduce(
      (totals, card) =>
        totals.flatMap((total) => card.values.map((value) => total + value)),
      [0]
    )
    .filter((points) => points <= MAX_HAND_VALUE)

const getHandValue = (cards: BlackjackCard[]) => {
  const totals = getHandValues(cards)
  return totals.length ? totals[totals.length - 1] : 0
}

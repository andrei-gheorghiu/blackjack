import { defineStore } from 'pinia'

import {
  CARD_COLORS,
  CARD_NAMES,
  DEALER,
  DECK_LENGTH,
  DEFAULT_STATE,
  MAX_HAND_VALUE,
  MIN_DEALER_VALUE,
  MIN_HAND_LENGTH
} from '../constants'
import { BlackjackCard, BlackjackPlayer } from '../types'
import { getHandValue, getHandValues, shuffle } from '../utils'

export interface BlackjackState {
  cards: BlackjackCard[]
  cardIds: string[]
  players: BlackjackPlayer[]
  decks: number
  currentPlayerIndex: number
  hasGameEnded: boolean
}

export const useBlackJack = defineStore('blackjack.ts', {
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
      this.cardIds = shuffle(this.cards.map(({ id }) => id))
    },
    dealCard() {
      this.currentPlayer.cards.push(this.nextCardId)
      if (this.isDealing) {
        this.advanceTurn()
        this.dealCard()
      } else {
        if (this.currentPlayer.isDealer) {
          if (this.hasGameEnded) {
            if (!this.isBusted(this.currentPlayer)) {
              this.playDealerTurn()
            }
          } else {
            this.advanceTurn()
          }
        } else {
          if (this.isBusted(this.currentPlayer)) this.advanceTurn()
        }
      }
    },
    advanceTurn() {
      this.currentPlayerIndex =
        (this.players.length + this.currentPlayerIndex + 1) %
        this.players.length

      if (this.currentPlayer.isDealer) {
        if (!this.isDealing) {
          this.playDealerTurn()
        }
      } else if (this.hasBlackjack(this.currentPlayer)) {
        this.advanceTurn()
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
        getHandValue(player.cards.map(useBlackJack().getCard)) > MAX_HAND_VALUE
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
          case getHandValue(playerHand) > MAX_HAND_VALUE:
          case getHandValue(dealerHand) <= MAX_HAND_VALUE &&
            getHandValue(playerHand) < getHandValue(dealerHand):
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
        this.getPlayerHandValue(p) === MAX_HAND_VALUE
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

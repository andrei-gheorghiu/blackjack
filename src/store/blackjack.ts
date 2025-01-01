import { defineStore } from 'pinia'

import {
  BLACKJACK_DEALER,
  BLACKJACK_DEFAULT_STATE,
  BLACKJACK_MAX_HAND_VALUE,
  BLACKJACK_MIN_DEALER_VALUE,
  BLACKJACK_MIN_HAND_LENGTH,
  CARD_COLORS,
  CARD_NAMES,
  DECK_LENGTH
} from '../constants'
import { BlackjackCard, BlackjackPlayer } from '../types'
import { getHandValue, shuffle } from '../utils'

export interface BlackjackState {
  cards: BlackjackCard[]
  cardIds: string[]
  players: BlackjackPlayer[]
  decks: number
  currentPlayerIndex: number
  hasGameEnded: boolean
}

export const useBlackJack = defineStore('blackjack', {
  state: (): BlackjackState => ({
    ...BLACKJACK_DEFAULT_STATE,
    players: [
      ...Array.from({ length: 4 }).map((_, index) => ({
        name: `Player ${index + 1}`
      })),
      BLACKJACK_DEALER
    ].map((data) => new BlackjackPlayer(data))
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
    splitHand() {
      this.currentPlayer.splitHand()
      this.currentPlayer.hand.push(this.nextCardId)
      this.currentPlayer.hands[this.currentPlayer.currentHandIndex + 1].push(
        this.nextCardId
      )
      this.checkHand()
    },
    getCard(uuid: string) {
      return this.cards.find(({ id }) => uuid === id) as BlackjackCard
    },
    reset() {
      this.players.forEach((p) => p.reset())
      Object.assign(this, { ...BLACKJACK_DEFAULT_STATE })
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
      this.currentPlayer.hand.push(this.nextCardId)
      if (this.isDealing) {
        this.advanceTurn()
        this.dealCard()
      } else {
        if (this.currentPlayer.isDealer) {
          if (this.hasGameEnded) {
            if (!this.handIsBusted(this.dealer.hand)) {
              this.playDealerTurn()
            }
          } else {
            this.advanceTurn()
          }
        } else {
          this.checkHand()
        }
      }
    },
    checkHand() {
      if (this.handIsBusted() || this.handHasMaxValue()) {
        this.advanceTurn()
      }
    },
    advanceTurn() {
      if (
        this.currentPlayer.hands.length - 1 >
        this.currentPlayer.currentHandIndex
      ) {
        this.currentPlayer.currentHandIndex += 1
      } else {
        this.currentPlayerIndex =
          (this.players.length + this.currentPlayerIndex + 1) %
          this.players.length
      }

      if (this.currentPlayer.isDealer) {
        if (!this.isDealing) {
          this.hasGameEnded = true
          this.playDealerTurn()
        }
      } else if (this.handHasBlackjack()) {
        this.advanceTurn()
      }
    },
    playDealerTurn() {
      const value = this.getPlayerHandValue(this.dealer.hand)
      if (
        value < BLACKJACK_MIN_DEALER_VALUE &&
        !(value > BLACKJACK_MAX_HAND_VALUE)
      ) {
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
    handIsBusted() {
      return (hand = useBlackJack().currentPlayer.hand): boolean =>
        getHandValue(this.getHandCards(hand)) > BLACKJACK_MAX_HAND_VALUE
    },
    dealtCardIds(): string[] {
      return this.players.map((player) => player.allCards).flat()
    },
    nextCardId(): string {
      return this.cardIds.filter((id) => !this.dealtCardIds.includes(id))[0]
    },
    isDealing(): boolean {
      return this.players.some(
        (player) => player.hand.length < BLACKJACK_MIN_HAND_LENGTH
      )
    },
    dealer(): BlackjackPlayer {
      return this.players.find((p) => p.isDealer) as BlackjackPlayer
    },
    isCardTurned() {
      return (cardId: string): boolean =>
        this.dealer.hand[0] !== cardId || !this.dealtCardIds.includes(cardId)
    },
    gameResult() {
      const dealerValue = this.getPlayerHandValue(this.dealer.hand)
      return (cards: string[]): string => {
        const playerValue = this.getPlayerHandValue(cards)
        switch (true) {
          case playerValue > BLACKJACK_MAX_HAND_VALUE:
          case dealerValue <= BLACKJACK_MAX_HAND_VALUE &&
            playerValue < dealerValue:
          case this.handHasBlackjack(this.dealer.hand) &&
            !this.handHasBlackjack(cards):
            return 'Loss'
          case this.handHasBlackjack(cards) &&
            !this.handHasBlackjack(this.dealer.hand):
            return 'Win'
          case playerValue === dealerValue:
            return 'Draw'
          default:
            return 'Win'
        }
      }
    },
    getHandCards() {
      return (hand: string[]): BlackjackCard[] =>
        hand.map(useBlackJack().getCard)
    },
    handHasMaxValue() {
      return (hand = useBlackJack().currentPlayer.hand): boolean =>
        this.getPlayerHandValue(hand) === BLACKJACK_MAX_HAND_VALUE
    },
    handHasBlackjack() {
      return (hand = useBlackJack().currentPlayer.hand): boolean =>
        hand.length === 2 && this.handHasMaxValue(hand)
    },
    getPlayerHandValue() {
      return (hand: string[]): number => getHandValue(this.getHandCards(hand))
    }
  }
})

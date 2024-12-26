import { nextTick } from 'vue'

import { DEALER, DEFAULT_STATE } from '../src/constants'
import { useBlackJack } from '../src/store'
import type { CARD_COLOR, CARD_NAME } from '../src/types'
import { BlackjackCard } from '../src/types'
import { pinia } from './preview.ts'

export const findCard = (
  [name, color]: [CARD_NAME, CARD_COLOR],
  store: ReturnType<typeof useBlackJack>
) => {
  return store.cards.find(
    (card) => card.color === color && card.name === name
  ) as BlackjackCard
}

export const StorybookDecorator = (
  story: unknown,
  {
    args
  }: {
    args: {
      cards: [CARD_NAME, CARD_COLOR][]
    }
  }
) => ({
  components: { story },
  setup: () => {
    const store = useBlackJack(pinia)
    if (args?.cards.length) {
      nextTick(() => {
        const cards = args.cards.map((pair) => findCard(pair, store).id)
        store.$patch({
          players: [
            {
              name: 'Player 1',
              cards: [cards[0], cards[1]]
            },
            {
              name: 'Dealer',
              cards: [cards[2], cards[3]],
              isDealer: true
            }
          ]
        })
      })
    } else {
      store.$patch({
        ...DEFAULT_STATE,
        players: [
          ...[1, 2, 3].map((n) => ({
            name: `Player ${n}`,
            cards: []
          })),
          DEALER
        ],
        cards: []
      })
      nextTick(() => {
        store.newGame()
      })
    }
  },
  template: '<story />'
})

import { BlackjackCard, CARD_COLOR, CARD_NAME } from '../src/types'
import { DEALER, DEFAULT_STATE, useBlackJack } from '../src/store'
import { pinia } from './preview.ts'
import { nextTick } from 'vue'

export const findCard = (
  [name, color]: [CARD_NAME, CARD_COLOR],
  store: ReturnType<typeof useBlackJack>
) => {
  return store.cards.find(
    (card) => card.color === color && card.name === name
  ) as BlackjackCard
}

export const StorybookDecorator = (
  story: any,
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

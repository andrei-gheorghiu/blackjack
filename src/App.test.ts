import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { findByText, useCleanConsole } from '../test/helpers.ts'
import { testCardIds, testCards } from '../test/testData.ts'
import App from './App.vue'
import { BlackjackPlayer } from './types'

const renderApp = (cardIds: string[]) =>
  mount(App, {
    plugins: [
      createTestingPinia({
        stubActions: false,
        createSpy: vi.fn,
        initialState: {
          blackjack: {
            cards: testCards,
            cardIds,
            players: [
              new BlackjackPlayer({
                name: 'Player 1',
                hands: [[cardIds[0], cardIds[1]]]
              }),
              new BlackjackPlayer({
                name: 'Dealer',
                hands: [[cardIds[2], cardIds[3]]],
                isDealer: true
              })
            ],
            decks: 1
          },
          animations: {
            positions: {}
          }
        }
      })
    ]
  })

describe('Rendering', () => {
  useCleanConsole()

  it('should render', () => {
    const wrapper = mount(App, {
      plugins: [
        createTestingPinia({
          stubActions: false,
          createSpy: vi.fn
        })
      ]
    })
    expect(wrapper).toBeTruthy()
  })
})

describe('Game results', () => {
  useCleanConsole()

  it('should lose on dealer blackjack', async () => {
    const { C10, CJ, SA, SK, ...rest } = testCardIds
    const wrapper = renderApp([C10, CJ, SA, SK, ...Object.values(rest)])
    await findByText(/Stand/, 'button', wrapper).trigger('click')

    expect(wrapper.find('.game-result').text()).toBe('Loss')
  })

  it('should win on player blackjack', async () => {
    const { SA, SK, C10, CJ, ...rest } = testCardIds
    const wrapper = renderApp([SA, SK, C10, CJ, ...Object.values(rest)])
    await findByText(/Stand/, 'button', wrapper).trigger('click')

    expect(wrapper.find('.game-result').text()).toBe('Win')
  })

  it('should win on player blackjack, even with dealer on 21', async () => {
    const { SA, SK, C10, C6, H5, ...rest } = testCardIds
    const wrapper = renderApp([SA, SK, C10, C6, H5, ...Object.values(rest)])
    await findByText(/Stand/, 'button', wrapper).trigger('click')

    expect(wrapper.find('.game-result').text()).toBe('Win')
  })

  it('should draw when both on blackjack', async () => {
    const { SA, SK, CA, CK, ...rest } = testCardIds
    const wrapper = renderApp([SA, SK, CA, CK, ...Object.values(rest)])
    await findByText(/Stand/, 'button', wrapper).trigger('click')

    expect(wrapper.find('.game-result').text()).toBe('Draw')
  })

  it('should lose when user busts', async () => {
    const { SJ, S5, S2, C2, C8, ...rest } = testCardIds
    const wrapper = renderApp([SJ, S5, S2, C2, C8, ...Object.values(rest)])
    await findByText(/Hit/, 'button', wrapper).trigger('click')

    expect(wrapper.find('.game-result').text()).toBe('Loss')
  })

  it('should lose when both bust', async () => {
    const { SJ, S5, S2, CJ, C8, C10, ...rest } = testCardIds
    const wrapper = renderApp([SJ, S5, S2, CJ, C8, C10, ...Object.values(rest)])
    await findByText(/Hit/, 'button', wrapper).trigger('click')

    expect(wrapper.find('.game-result').text()).toBe('Loss')
  })

  it('should win when only dealer busts', async () => {
    const { SJ, S5, S2, CJ, C10, ...rest } = testCardIds
    const wrapper = renderApp([SJ, S5, S2, CJ, C10, ...Object.values(rest)])
    await findByText(/Stand/, 'button', wrapper).trigger('click')

    expect(wrapper.find('.game-result').text()).toBe('Win')
  })

  it('should draw on equal value hands', async () => {
    const { SJ, S8, S2, CJ, C6, ...rest } = testCardIds
    const wrapper = renderApp([SJ, S8, S2, CJ, C6, ...Object.values(rest)])
    await findByText(/Stand/, 'button', wrapper).trigger('click')

    expect(wrapper.find('.game-result').text()).toBe('Draw')
  })
})

describe('Splitting', () => {
  useCleanConsole()

  it('should split', async () => {
    const { SJ, C10, S2, S10, SA, S8, D8, ...rest } = testCardIds
    const wrapper = renderApp([
      SJ,
      C10,
      S2,
      S10,
      SA,
      S8,
      D8,
      ...Object.values(rest)
    ])
    await findByText(/Split/, 'button', wrapper).trigger('click')
    await findByText(/Stand/, 'button', wrapper).trigger('click')

    const results = wrapper.findAll('.game-result')

    expect(results.length).toBe(2)
    expect(results.map((item) => item.text())).toEqual(['Win', 'Loss'])
  })
})

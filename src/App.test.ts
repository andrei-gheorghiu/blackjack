import { describe, it, vi, afterEach, beforeEach, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import App from './App.vue'
import { createTestingPinia } from '@pinia/testing'
import { useBlackJack } from './store'
import { findByText } from '../test/helpers.ts'
import { testCards, testCardIds } from '../test/testData.ts'

let errorSpy: any
let logSpy: any

/***
 * The whole point of having storybook is being able to import the stories as
 * components in the tests (already having the proper state) and testing them
 * However, storybook doesn't yet have a solid integration with vitest;
 * They have a prototype, I've tried it, but it's still a w.i.p. and
 * I couldn't make it work, given the time.
 *
 * Instead, I'll just recreate here what I've done in storybook
 *
 * As an example, here's how a storybook test would look like:

 describe('Draw blackjack', async () => {
 const wrapper = mount(DrawBlackjack())
 await findByText(/Stand/, 'button', wrapper).trigger('click')

 expect(wrapper.find('.game-result').text()).toBe('Draw')
 })

 ***/

const renderApp = (cardIds: string[]) => {
  const pinia = createTestingPinia({
    stubActions: false,
    createSpy: vi.fn
  })
  const wrapper = mount(App, {
    plugins: [pinia]
  })
  const store = useBlackJack(pinia)
  store.$patch({
    cards: testCards,
    cardIds,
    players: [
      {
        name: 'Player 1',
        cards: [cardIds[0], cardIds[1]]
      },
      {
        name: 'Dealer',
        cards: [cardIds[2], cardIds[3]],
        isDealer: true
      }
    ]
  })
  return wrapper
}

describe('<App.vue />', () => {
  beforeEach(() => {
    errorSpy = vi.spyOn(console, 'error')
    logSpy = vi.spyOn(console, 'log')
  })
  afterEach(() => {
    expect(errorSpy).not.toHaveBeenCalled()
    expect(logSpy).not.toHaveBeenCalled()
    vi.restoreAllMocks()
  })

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

  it('should draw when both blackjack', async () => {
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

  it('should win when dealer busts', async () => {
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

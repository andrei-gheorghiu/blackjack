import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'

import { findByText } from '../../test/helpers.ts'
import { useBlackJack } from '../store'
import BlackjackGame from './BlackjackGame.vue'

let errorSpy: unknown
let logSpy: unknown

describe('<BlackjackGame.vue />', () => {
  beforeEach(() => {
    errorSpy = vi.spyOn(console, 'error')
    logSpy = vi.spyOn(console, 'log')
  })
  afterEach(() => {
    expect(errorSpy).not.toHaveBeenCalled()
    expect(logSpy).not.toHaveBeenCalled()
    vi.restoreAllMocks()
  })
  const pinia = createTestingPinia({
    stubActions: false,
    createSpy: vi.fn
  })
  const wrapper = mount(BlackjackGame, {
    global: {
      plugins: [pinia]
    }
  })
  const store = useBlackJack(pinia)

  it('should render', () => {
    expect(wrapper).toBeTruthy()
  })

  it('should start a new game when game has ended', async () => {
    expect(store.newGame).not.toHaveBeenCalled()
    store.$patch({ hasGameEnded: true })
    await nextTick()
    const button = findByText(/New game/, 'button', wrapper)
    await button.trigger('click')
    expect(store.newGame).toHaveBeenCalledOnce()
  })
})

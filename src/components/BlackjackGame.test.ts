import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'

import { findByText, useCleanConsole } from '../../test/helpers.ts'
import { useBlackJack } from '../store'
import BlackjackGame from './BlackjackGame.vue'

describe('<BlackjackGame.vue />', () => {
  useCleanConsole()
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

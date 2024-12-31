import type { VueWrapper } from '@vue/test-utils'
import { afterEach, beforeEach, expect, vi } from 'vitest'

export const findByText = (
  pattern: RegExp,
  selector: string,
  wrapper: VueWrapper
) => wrapper.findAll(selector).filter((b) => b.text().match(pattern))[0]

export const useCleanConsole = () => {
  let errorSpy: unknown
  let logSpy: unknown
  beforeEach(() => {
    errorSpy = vi.spyOn(console, 'error')
    logSpy = vi.spyOn(console, 'log')
  })
  afterEach(() => {
    expect(errorSpy).not.toHaveBeenCalled()
    expect(logSpy).not.toHaveBeenCalled()
    vi.restoreAllMocks()
  })
}

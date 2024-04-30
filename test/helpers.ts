import type { VueWrapper } from '@vue/test-utils'

export const findByText = (
  pattern: RegExp,
  selector: string,
  wrapper: VueWrapper
) => wrapper.findAll(selector).filter((b) => b.text().match(pattern))[0]

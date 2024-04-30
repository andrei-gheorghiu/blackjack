import type { Meta, StoryObj } from '@storybook/vue3'
import App from './App.vue'
import { StorybookDecorator } from '../.storybook/helpers.ts'
import { CARD_COLOR, CARD_NAME } from './types'

const meta = {
  title: 'App',
  component: App,
  decorators: [StorybookDecorator as any]
} satisfies Meta<typeof App>

export default meta

type Story = StoryObj<typeof App> & {
  args?: { cards: [CARD_NAME, CARD_COLOR][] }
}

export const Usage: Story = {
  args: {
    cards: []
  }
}

export const DealerBlackjack: Story = {
  args: {
    cards: [
      ['TEN', 'CLUBS'],
      ['JACK', 'CLUBS'],
      ['ACE', 'SPADES'],
      ['KING', 'SPADES']
    ]
  }
}

export const PlayerBlackjack: Story = {
  args: {
    cards: [
      ['ACE', 'SPADES'],
      ['KING', 'SPADES'],
      ['TEN', 'CLUBS'],
      ['JACK', 'CLUBS']
    ]
  }
}

export const DrawBlackjack: Story = {
  args: {
    cards: [
      ['ACE', 'SPADES'],
      ['KING', 'SPADES'],
      ['ACE', 'CLUBS'],
      ['KING', 'CLUBS']
    ]
  }
}

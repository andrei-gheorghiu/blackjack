<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ComponentPublicInstance, computed } from 'vue'

import { useBlackJack } from '../store'
import { useAnimations } from '../store/animations.ts'
import { BlackjackPlayer } from '../types'
import PlayingCard from './PlayingCard.vue'

const props = defineProps({
  player: {
    type: Object as () => BlackjackPlayer,
    required: true
  },
  angle: {
    type: Number,
    default: 0
  }
})
const store = useBlackJack()
const { isCurrentPlayer, hasGameEnded, gameResult, getPlayerHandValue } =
  storeToRefs(store)
const isCurrentHand = computed(() => {
  return (index: number) =>
    isCurrentPlayer.value(props.player) &&
    props.player?.currentHandIndex === index
})
const { dealCard, advanceTurn, getCard, splitHand } = store
const { positions } = storeToRefs(useAnimations())
const getRandomAngle = computed(
  () => (id: string, dim: number) =>
    positions.value[id] ? (Math.floor(Math.random() * 10) - 6) / dim : 0
)
const isHandSplittable = computed(
  () =>
    props.player.hand.length === 2 &&
    new Set([0, 1].map((index) => getCard(props.player.hand[index]).values[0]))
      .size === 1 &&
    props.player.hands.length < 4
)
const registerCard = (el: ComponentPublicInstance, id: string) => {
  if (!positions.value[id]) {
    const { left, top, width } = el.$el.getBoundingClientRect()
    positions.value[id] = { left, top, width }
  }
}
</script>

<template>
  <div class="rotator" :style="{ '--player-rotate': `${angle}deg` }">
    <div :class="['player', { split: player.hands.length > 1 }]">
      <div class="name">
        <span
          class="player-score"
          v-if="player.isDealer"
          v-text="hasGameEnded ? getPlayerHandValue(player.hand) : '?'"
        />
        <span v-text="player.name" />
      </div>
      <div class="hands">
        <div class="hand" v-for="(hand, key) in player.hands" :key="key">
          <div class="cards">
            <PlayingCard
              :ref="
                ((el: ComponentPublicInstance) =>
                  registerCard(el, card)) as never
              "
              v-for="(card, index) in hand"
              :key="card"
              :uuid="card"
              :style="{
                '--angle': `${getRandomAngle(card, index + 1)}deg`
              }"
            />
          </div>
          <div class="player-footer" v-if="!player.isDealer">
            <span class="player-score" v-text="getPlayerHandValue(hand)" />
            <div
              v-if="isCurrentPlayer(player) && isCurrentHand(key)"
              class="player-actions"
            >
              <button @click="dealCard">Hit</button>
              <button v-if="isHandSplittable" @click="splitHand">Split</button>
              <button @click="advanceTurn">Stand</button>
            </div>
            <div v-if="hasGameEnded" class="game-result">
              {{ gameResult(hand) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

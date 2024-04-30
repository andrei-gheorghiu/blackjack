<script setup lang="ts">
import { BlackjackPlayer, useBlackJack } from '../store'
import PlayingCard from './PlayingCard.vue'
import { storeToRefs } from 'pinia'

defineProps({
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
const { dealCard, advanceTurn } = store
const getRandomAngle = (dim: number) =>
  (Math.floor(Math.random() * 10) - 6) / dim
</script>

<template>
  <div class="rotator" :style="{ '--player-rotate': `${angle}deg` }">
    <div class="player">
      <div class="name">
        <span v-text="player.name" />
        <span
          v-if="hasGameEnded || isCurrentPlayer(player)"
          class="ml-2"
          v-text="`(${getPlayerHandValue(player)})`"
        />
      </div>
      <div class="cards">
        <PlayingCard
          v-for="(card, index) in player.cards"
          :key="card"
          :uuid="card"
          :style="{
            '--angle': `${getRandomAngle(index + 1)}deg`
          }"
        />
      </div>
      <div
        v-if="isCurrentPlayer(player) && !player.isDealer"
        class="player-actions"
      >
        <button @click="dealCard">Hit</button>
        <button @click="advanceTurn">Stand</button>
      </div>
      <div v-if="hasGameEnded && !player.isDealer" class="game-result">
        {{ gameResult(player) }}
      </div>
    </div>
  </div>
</template>

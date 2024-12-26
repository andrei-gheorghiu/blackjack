<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

import { useBlackJack } from '../store'
import BlackjackPlayer from './BlackjackPlayer.vue'

const { players, isDealing, hasGameEnded } = storeToRefs(useBlackJack())
const { newGame } = useBlackJack()
onMounted(() => {
  if (isDealing.value) newGame()
})
const getPlayerAngle = (index: number, total: number) =>
  (360 / total) * (index + 1) + 180
</script>

<template>
  <div class="blackjack-table">
    <BlackjackPlayer
      v-for="(player, index) in players"
      v-bind="{ player }"
      :key="player.name"
      :angle="getPlayerAngle(index, players.length)"
    />
    <div v-if="hasGameEnded" class="game-actions">
      <button @click="() => newGame()">New game</button>
    </div>
  </div>
</template>

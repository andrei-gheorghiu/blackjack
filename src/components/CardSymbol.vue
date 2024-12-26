<template>
  <div class="card-symbol">
    <span v-html="CardNames[card.name]" />
    <span v-html="CardColors[card.color]" />
  </div>
</template>

<script setup lang="ts">
import { PlayingCard } from '../types'
import { CardColors, CardNames } from '../constants'
defineProps({
  card: {
    type: PlayingCard,
    required: true
  }
})
</script>

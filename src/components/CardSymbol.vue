<template>
  <div class="card-symbol">
    <span v-html="CardNames[card.name]" />
    <span v-html="CardColors[card.color]" />
  </div>
</template>

<script setup lang="ts">
import { CardColors, CardNames } from '../constants'
import { PlayingCard } from '../types'
defineProps({
  card: {
    type: PlayingCard,
    required: true
  }
})
</script>

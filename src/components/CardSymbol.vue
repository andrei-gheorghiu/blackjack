<template>
  <div class="card-symbol">
    <span v-html="CardNames[card.name]" />
    <span v-html="CardColors[card.color]" />
  </div>
</template>

<script setup lang="ts">
import { CardNames, CardColors, PlayingCard } from '../types'
defineProps({
  card: {
    type: PlayingCard,
    required: true
  }
})
</script>

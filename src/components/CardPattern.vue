<template>
  <span v-html="CardColors[card.color]" />
</template>

<script setup lang="ts">
import { CardColors, PlayingCard } from '../types'

defineProps({
  card: {
    type: PlayingCard,
    required: true
  }
})
</script>

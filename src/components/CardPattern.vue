<template>
  <span v-html="COLOR_SYMBOL[card.color]" />
</template>

<script setup lang="ts">
import { COLOR_SYMBOL, PlayingCard } from '../types'

defineProps({
  card: {
    type: PlayingCard,
    required: true
  }
})
</script>

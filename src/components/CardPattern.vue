<template>
  <span v-html="CardColors[card.color]" />
</template>

<script setup lang="ts">
import { PlayingCard } from '../types'
import { CardColors } from '../constants'

defineProps({
  card: {
    type: PlayingCard,
    required: true
  }
})
</script>

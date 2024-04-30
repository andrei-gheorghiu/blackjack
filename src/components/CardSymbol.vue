<template>
  <div class="card-symbol">
    <span v-html="NAME_SYMBOL[card.name]" />
    <span v-html="COLOR_SYMBOL[card.color]" />
  </div>
</template>

<script setup lang="ts">
import { NAME_SYMBOL, COLOR_SYMBOL, PlayingCard } from '../types'
defineProps({
  card: {
    type: PlayingCard,
    required: true
  }
})
</script>

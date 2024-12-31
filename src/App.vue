<script setup lang="ts">
import { reactive } from 'vue'

import BlackJackGame from './components/BlackjackGame.vue'

const cardSizes = reactive({
  '--card-font': '1rem',
  '--card-ratio': '2/3'
})
</script>

<template>
  <div id="app-root" :style="cardSizes">
    <BlackJackGame />
  </div>
</template>

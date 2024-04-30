<script setup lang="ts">
import BlackJackGame from './components/BlackjackGame.vue'
import { reactive } from 'vue'

const cardSizes = reactive({
  '--card-font': '1.2rem',
  '--card-ratio': '2/3'
})
</script>

<template>
  <div id="app-root" :style="cardSizes">
    <BlackJackGame />
  </div>
</template>

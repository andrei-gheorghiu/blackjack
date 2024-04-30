<script setup lang="ts">
import { computed } from 'vue'
import { useBlackJack } from '../store'
import CardSymbol from './CardSymbol.vue'
import CardPattern from './CardPattern.vue'
import { storeToRefs } from 'pinia'

const props = defineProps({
  uuid: {
    type: String,
    required: true
  }
})
const store = useBlackJack()
const card = computed(() => store.getCard(props.uuid))
const { isCardTurned, hasGameEnded } = storeToRefs(store)
const isTurned = computed(
  () => isCardTurned.value(props.uuid) || hasGameEnded.value
)
</script>

<template>
  <div
    v-if="card"
    class="playing-card"
    :class="{
      turned: isTurned
    }"
  >
    <div ref="cardEl" class="inner">
      <template v-if="isTurned">
        <div :class="['card-face', card.color, card.name]">
          <CardSymbol :card="card" />
          <CardPattern :card="card" />
        </div>
      </template>
      <div v-else class="card-back" />
    </div>
  </div>
</template>

import { defineStore } from 'pinia'

type CardPosition = {
  left: number
  top: number
  width: number
}
interface AnimationsState {
  positions: Record<string, CardPosition>
}

export const useAnimations = defineStore('animations', {
  state: (): AnimationsState => ({
    positions: {}
  })
})

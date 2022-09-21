<template>
  <div class="1"></div>
</template>
<script setup lang="ts">
import type { CqkjMap } from 'cqkj-map'
import { nextTick } from 'vue'
import { useTileMap } from './hooks'

const props = defineProps<{
  map: CqkjMap | undefined
}>()

/**切换底图 */
// const { tileMap, currentBasemap, baseMap, changeBasemap } = useTileMap()

nextTick(() => {
  if (!props.map) {
    throw new Error('tile map error')
  }
  // tileMap.addTo(props.map)
  console.log('test')
})
</script>
<style scoped lang="less"></style>

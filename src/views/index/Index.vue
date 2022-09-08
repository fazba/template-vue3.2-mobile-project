<template>
  <div class="container">
    <!-- 地图 -->
    <div class="map-container" id="map-container"></div>
    <!-- 上部 -->
    <div class="top-box"></div>
    <!-- 左侧 -->
    <div class="left-box">
      <TileComponent :map="pMap" />
      <WindComponent :map="pMap" />
    </div>
    <!-- 右侧 -->
    <div class="right-box">
      <!-- 预警轮播图 -->
    </div>
    <!-- 下部 -->
    <div class="bottom-box">
      <!-- 风速风向 -->

      <!-- 天气 -->
    </div>
    <!-- 当前机位图表 -->
    <div class="chart"></div>
  </div>
</template>
<script setup lang="ts">
import { Button, Popup } from 'vant'
import { nextTick, ref } from 'vue'
import { useMap, useWind } from './hooks'
import { useRoute } from 'vue-router'
// component
import TileComponent from '@/components/tileMap/Index.vue'
import WindComponent from '@/components/wind/Index.vue'

const route = useRoute()

/**
 *
 * 地图、边界相关
 *
 */
const { pMap } = useMap(route)

/**机位、测风塔、标记 */
// const { points, currentFanMsg, isShowFanChart } = usePoints(route)
/**挂载到地图 */
nextTick(() => {
  // const map = pMap.value!
  // points.addTo(map)
})
</script>
<style scoped>
.container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.map-container {
  height: 100%;
  width: 100%;
}
</style>

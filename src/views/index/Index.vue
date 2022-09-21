<template>
  <div class="container">
    <!-- 地图 -->
    <div class="map-container" id="map-container"></div>
    <!-- 上部 -->
    <div class="top-box"></div>
    <!-- 左侧 -->
    <div class="left-box"></div>
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
<script setup lang="ts"></script>
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

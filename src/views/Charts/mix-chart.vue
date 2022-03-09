<template>
  <div class="chart-container">
    <chart height="100%" width="100%" />
  </div>
</template>

<script setup lang="ts">
  import Chart from "@/components/Charts/MixChart.vue"
</script>

<style lang="scss" scoped>
  .chart-container {
    position: relative;
    width: 100%;
    height: calc(100vh - 84px);
  }
</style>

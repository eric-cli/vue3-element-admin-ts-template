<template>
  <div ref="chartRef" :class="className" :style="{ height: height, width: width }" />
</template>

<script lang="ts" setup>
  import type { Ref } from "vue"
  import echarts from "@/utils/echarts"
  import { useECharts } from "@/hooks/useECharts"

  const props = defineProps({
    className: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "300px"
    }
  })
  const chartRef = ref<HTMLDivElement | null>(null)
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>)
  const options: any = {
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      left: "center",
      bottom: "10",
      data: ["Industries", "Technology", "Forex", "Gold", "Forecasts"]
    },
    series: [
      {
        name: "WEEKLY WRITE ARTICLES",
        type: "pie",
        roseType: "radius",
        radius: [15, 95],
        center: ["50%", "38%"],
        data: [
          { value: 320, name: "Industries" },
          { value: 240, name: "Technology" },
          { value: 149, name: "Forex" },
          { value: 100, name: "Gold" },
          { value: 59, name: "Forecasts" }
        ],
        animationEasing: "cubicInOut",
        animationDuration: 2600
      }
    ]
  }
  onMounted(() => {
    nextTick(() => {
      setOptions(options)
    })
  })
</script>

<style lang="scss" scoped></style>

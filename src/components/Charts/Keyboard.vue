<template>
  <div :id="EntityId" ref="chartRef" :class="className" :style="{ height: height, width: width }" />
</template>

<script setup lang="ts">
  import type { Ref } from "vue"
  import echarts, { generateMixed } from "@/utils/echarts"
  import { useECharts } from "@/hooks/useECharts"

  const chartRef = ref<HTMLDivElement | null>(null)
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>)
  const props = defineProps({
    className: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "200px"
    },
    height: {
      type: String,
      default: "200px"
    }
  })
  const EntityId = ref<string>("")
  const xAxisData: number[] = []
  const data: any = []
  const data2: any = []
  for (let i = 0; i < 50; i += 1) {
    xAxisData.push(i)
    data.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5)
    data2.push((Math.sin(i / 5) * (i / 5 + 10) + i / 6) * 3)
  }
  const options: any = {
    backgroundColor: "#08263a",
    grid: {
      left: "5%",
      right: "5%"
    },
    xAxis: [
      {
        show: false,
        data: xAxisData
      },
      {
        show: false,
        data: xAxisData
      }
    ],
    visualMap: {
      show: false,
      min: 0,
      max: 50,
      dimension: 0,
      inRange: {
        color: ["#4a657a", "#308e92", "#b1cfa5", "#f5d69f", "#f5898b", "#ef5055"]
      }
    },
    yAxis: {
      axisLine: {
        show: false
      },
      axisLabel: {
        color: "#4a657a"
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "#08263f"
        }
      },
      axisTick: {
        show: false
      }
    },
    series: [
      {
        name: "back",
        type: "bar",
        data: data2,
        z: 1,
        itemStyle: {
          opacity: 0.4,
          borderRadius: 5,
          shadowBlur: 3,
          shadowColor: "#111"
        }
      },
      {
        name: "Simulate Shadow",
        type: "line",
        data,
        z: 2,
        showSymbol: false,
        animationDelay: 0,
        animationEasing: "linear",
        animationDuration: 1200,
        lineStyle: {
          color: "transparent"
        },
        areaStyle: {
          color: "#08263a",
          shadowBlur: 50,
          shadowColor: "#000"
        }
      },
      {
        name: "front",
        type: "bar",
        data,
        xAxisIndex: 1,
        z: 3,
        itemStyle: {
          borderRadius: 5
        }
      }
    ],
    animationEasing: "elasticOut",
    animationEasingUpdate: "elasticOut",
    animationDelay(idx) {
      return idx * 20
    },
    animationDelayUpdate(idx) {
      return idx * 20
    }
  }
  onMounted(() => {
    EntityId.value = generateMixed(5, 4)
    nextTick(() => {
      setOptions(options)
    })
  })
</script>

<style lang="scss" scoped></style>

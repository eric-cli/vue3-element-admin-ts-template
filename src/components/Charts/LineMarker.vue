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
  const options: any = {
    backgroundColor: "#394056",
    title: {
      top: 20,
      text: "Requests",
      textStyle: {
        fontWeight: "normal",
        fontSize: 16,
        color: "#F1F1F3"
      },
      left: "1%"
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        lineStyle: {
          color: "#57617B"
        }
      }
    },
    legend: {
      top: 20,
      icon: "rect",
      itemWidth: 14,
      itemHeight: 5,
      itemGap: 13,
      data: ["CMCC", "CTCC", "CUCC"],
      right: "4%",
      textStyle: {
        fontSize: 12,
        color: "#F1F1F3"
      }
    },
    grid: {
      top: 100,
      left: "2%",
      right: "2%",
      bottom: "2%",
      containLabel: true
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        axisLine: {
          lineStyle: {
            color: "#57617B"
          }
        },
        data: [
          "13:00",
          "13:05",
          "13:10",
          "13:15",
          "13:20",
          "13:25",
          "13:30",
          "13:35",
          "13:40",
          "13:45",
          "13:50",
          "13:55"
        ]
      }
    ],
    yAxis: [
      {
        type: "value",
        name: "(%)",
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: "#57617B"
          }
        },
        axisLabel: {
          margin: 10,
          fontSize: 14
        },
        splitLine: {
          lineStyle: {
            color: "#57617B"
          }
        }
      }
    ],
    series: [
      {
        name: "CMCC",
        type: "line",
        smooth: true,
        symbol: "circle",
        symbolSize: 5,
        showSymbol: false,
        lineStyle: {
          width: 1
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: "rgba(137, 189, 27, 0.3)"
              },
              {
                offset: 0.8,
                color: "rgba(137, 189, 27, 0)"
              }
            ],
            false
          ),
          shadowColor: "rgba(0, 0, 0, 0.1)",
          shadowBlur: 10
        },
        itemStyle: {
          color: "rgb(137,189,27)",
          borderColor: "rgba(137,189,2,0.27)",
          borderWidth: 12
        },
        data: [220, 182, 191, 134, 150, 120, 110, 125, 145, 122, 165, 122]
      },
      {
        name: "CTCC",
        type: "line",
        smooth: true,
        symbol: "circle",
        symbolSize: 5,
        showSymbol: false,
        lineStyle: {
          width: 1
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: "rgba(0, 136, 212, 0.3)"
              },
              {
                offset: 0.8,
                color: "rgba(0, 136, 212, 0)"
              }
            ],
            false
          ),
          shadowColor: "rgba(0, 0, 0, 0.1)",
          shadowBlur: 10
        },
        itemStyle: {
          color: "rgb(0,136,212)",
          borderColor: "rgba(0,136,212,0.2)",
          borderWidth: 12
        },
        data: [120, 110, 125, 145, 122, 165, 122, 220, 182, 191, 134, 150]
      },
      {
        name: "CUCC",
        type: "line",
        smooth: true,
        symbol: "circle",
        symbolSize: 5,
        showSymbol: false,
        lineStyle: {
          width: 1
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: "rgba(219, 50, 51, 0.3)"
              },
              {
                offset: 0.8,
                color: "rgba(219, 50, 51, 0)"
              }
            ],
            false
          ),
          shadowColor: "rgba(0, 0, 0, 0.1)",
          shadowBlur: 10
        },
        itemStyle: {
          color: "rgb(219,50,51)",
          borderColor: "rgba(219,50,51,0.2)",
          borderWidth: 12
        },
        data: [220, 182, 125, 145, 122, 191, 134, 150, 120, 110, 165, 122]
      }
    ]
  }
  onMounted(() => {
    EntityId.value = generateMixed(5, 4)
    nextTick(() => {
      setOptions(options)
    })
  })
</script>

<style lang="scss" scoped></style>

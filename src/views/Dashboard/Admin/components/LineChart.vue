<template>
  <div
    ref="chartRef"
    :class="className"
    :style="{ height: height, width: width }"
  />
</template>

<script lang="ts" setup>
import type { Ref } from "vue";
import echarts from "@/utils/echarts";
import { useECharts } from "@/hooks/useECharts";
const props = defineProps({
  className: {
    type: String,
    default: "chart",
  },
  width: {
    type: String,
    default: "100%",
  },
  height: {
    type: String,
    default: "350px",
  },
  autoResize: {
    type: Boolean,
    default: true,
  },
  chartData: {
    type: Object,
    required: true,
  },
});
const chartRef = ref<HTMLDivElement | null>(null);
const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);
const setOption = ({ expectedData, actualData } = {}) => {
  setOptions({
    xAxis: {
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      boundaryGap: false,
      axisTick: {
        show: false,
      },
    },
    grid: {
      left: 10,
      right: 10,
      bottom: 20,
      top: 30,
      containLabel: true,
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
      padding: [5, 10],
    },
    yAxis: {
      axisTick: {
        show: false,
      },
    },
    legend: {
      data: ["expected", "actual"],
    },
    series: [
      {
        name: "expected",
        itemStyle: {
          normal: {
            color: "#FF005A",
            lineStyle: {
              color: "#FF005A",
              width: 2,
            },
          },
        },
        smooth: true,
        type: "line",
        data: expectedData,
        animationDuration: 2800,
        animationEasing: "cubicInOut",
      },
      {
        name: "actual",
        smooth: true,
        type: "line",
        itemStyle: {
          normal: {
            color: "#3888fa",
            lineStyle: {
              color: "#3888fa",
              width: 2,
            },
            areaStyle: {
              color: "#f3f8ff",
            },
          },
        },
        data: actualData,
        animationDuration: 2800,
        animationEasing: "quadraticOut",
      },
    ],
  });
};

onMounted(() => {
  nextTick(() => {
    setOption();
  });
});
</script>

<style lang="scss" scoped></style>

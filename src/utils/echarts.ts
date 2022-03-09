// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from "echarts/core"
// 引入柱状图图表，图表后缀都为 Chart
import { BarChart, LineChart, PieChart, RadarChart } from "echarts/charts"
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
// import // TitleComponent,
// // TooltipComponent,
// GridComponent,
// // DatasetComponent,
// // TransformComponent,
// "echarts/components";
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  VisualMapComponent
} from "echarts/components"
// 标签自动布局，全局过渡动画等特性
import { LabelLayout, UniversalTransition } from "echarts/features"
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from "echarts/renderers"

// 注册必须的组件
echarts.use([
  // TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  VisualMapComponent,
  // DatasetComponent,
  // TransformComponent,
  RadarChart,
  LineChart,
  PieChart,
  BarChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
])

export default echarts

export const generateMixed = (n, j) => {
  const chars = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z"
  ]
  const arr = []
  for (let h = 0; h < j; h += 1) {
    let res = ""
    for (let i = 0; i < n; i += 1) {
      const id = Math.ceil(Math.random() * 35)
      res += chars[id]
    }
    arr.push(res)
  }
  return arr.join("-")
}

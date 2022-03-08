import type { EChartsOption } from "echarts"
import type { Ref } from "vue"
import { useTimeoutFn } from "@/hooks/useTimeout"
import { useEventListener } from "@/hooks/useEventListener"
import echarts from "@/utils/echarts"

export function useECharts(
  elRef: Ref<HTMLDivElement>,
  theme: "light" | "dark" | "default" = "default"
) {
  const getDarkMode = computed(() => {
    return theme
  })
  let chartInstance: echarts.ECharts | null = null
  const resize = () => {
    chartInstance?.resize()
  }
  let resizeFn: Fn = resize
  const cacheOptions = ref({}) as Ref<EChartsOption>
  let removeResizeFn: Fn = () => {}

  resizeFn = useDebounceFn(resize, 200)

  const getOptions = computed(() => {
    return {
      backgroundColor: "transparent",
      ...cacheOptions.value
    } as EChartsOption
  })

  const initCharts = () => {
    const el = unref(elRef)
    if (!el || !unref(el)) {
      return
    }
    chartInstance = echarts.init(el)

    const { removeEvent } = useEventListener({
      el: window,
      name: "resize",
      listener: resizeFn
    })
    removeResizeFn = removeEvent

    if (el.offsetHeight === 0) {
      useTimeoutFn(() => {
        resizeFn()
      }, 30)
    }
  }

  const setOptions = (options: EChartsOption, clear = true) => {
    cacheOptions.value = options

    if (unref(elRef)?.offsetHeight === 0) {
      useTimeoutFn(() => {
        setOptions(unref(getOptions))
      }, 30)
      return
    }

    nextTick(() => {
      useTimeoutFn(() => {
        if (!chartInstance) {
          initCharts()

          if (!chartInstance) return
        }

        clear && chartInstance?.clear()
        chartInstance?.setOption(unref(getOptions))
      }, 30)
    })
  }

  watch(
    () => getDarkMode.value,
    () => {
      if (chartInstance) {
        chartInstance.dispose()
        initCharts()
        setOptions(cacheOptions.value)
      }
    }
  )

  // 组件卸载前销毁echarts
  tryOnUnmounted(() => {
    if (!chartInstance) return
    removeResizeFn()
    chartInstance.dispose()
    chartInstance = null
  })

  const getInstance = (): echarts.ECharts | null => {
    if (!chartInstance) {
      initCharts()
    }
    return chartInstance
  }

  return {
    setOptions,
    resize,
    echarts,
    getInstance
  }
}

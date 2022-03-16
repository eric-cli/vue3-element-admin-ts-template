<template>
  <el-scrollbar
    ref="scrollContainer"
    :noresize="true"
    class="scroll-container"
    @wheel.prevent="handleScroll"
    @scroll="emitScroll"
  >
    <slot />
  </el-scrollbar>
</template>

<script lang="ts" setup>
  import type { ElScrollbar } from "element-plus"

  const tagAndTagSpacing = 4 // tagAndTagSpacing
  const left = ref(0)
  const emits = defineEmits(["scroll"])
  const internalInstance: any = getCurrentInstance()
  const scrollContainer: any = ref<InstanceType<typeof ElScrollbar>>()
  const scrollWrapper: any = computed(() => {
    return scrollContainer.value.$refs.wrap$
  })
  const emitScroll = () => {
    emits("scroll")
  }
  const handleScroll = (e) => {
    // TODO: check 功能是否开发完成,滚动问题优化
    console.log(e)
    const eventDelta = e.wheelDelta || -e.deltaY * 40
    // scrollContainer.value!.setScrollLeft(scrollWrapper.value!.scrollLeft + eventDelta / 4)
    scrollWrapper.value!.scrollLeft = scrollWrapper.value!.scrollLeft + eventDelta / 4
  }

  const moveToTarget = (currentTag) => {
    // 所有的组件都有一个属性$el:用于获取组件中的元素
    const $container: any = scrollContainer.value.$el
    console.log($container)

    const $containerWidth = $container.offsetWidth
    const tagList = internalInstance.ctx.parent.ctx.tagRefs

    let firstTag = null
    let lastTag = null

    // find first tag and last tag
    if (tagList.length > 0) {
      firstTag = tagList[0]
      lastTag = tagList[tagList.length - 1]
    }

    if (firstTag === currentTag) {
      scrollWrapper.value!.scrollLeft = 0
    } else if (lastTag === currentTag) {
      scrollWrapper.value!.scrollLeft = scrollWrapper.value!.scrollWidth - $containerWidth
    } else {
      // find preTag and nextTag
      const currentIndex = tagList.findIndex((item) => item === currentTag)
      const prevTag = tagList[currentIndex - 1]
      const nextTag = tagList[currentIndex + 1]

      // the tag's offsetLeft after of nextTag
      const afterNextTagOffsetLeft =
        nextTag.$el.offsetLeft + nextTag.$el.offsetWidth + tagAndTagSpacing

      // the tag's offsetLeft before of prevTag
      const beforePrevTagOffsetLeft = prevTag.$el.offsetLeft - tagAndTagSpacing

      if (afterNextTagOffsetLeft > scrollWrapper.value!.scrollLeft + $containerWidth) {
        scrollWrapper.value!.scrollLeft = afterNextTagOffsetLeft - $containerWidth
      } else if (beforePrevTagOffsetLeft < scrollWrapper.value!.scrollLeft) {
        scrollWrapper.value!.scrollLeft = beforePrevTagOffsetLeft
      }
    }
  }
  // onMounted(() => {
  //   scrollWrapper.value!.addEventListener("scroll", emitScroll, true)
  // })
  // onUnmounted(() => {
  //   scrollWrapper.value!.removeEventListener("scroll", emitScroll, true)
  // })
</script>

<style lang="scss" scoped>
  .scroll-container {
    white-space: nowrap;
    position: relative;
    // overflow: hidden;
    width: 100%;
    :deep(.el-scrollbar__bar) {
      bottom: 0px;
    }
    :deep(.el-scrollbar__wrap) {
      height: 100%;
    }
    :deep(.el-scrollbar__view) {
      height: 100%;
    }
  }
</style>

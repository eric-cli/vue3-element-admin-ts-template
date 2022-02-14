<template>
  <el-scrollbar
    ref="scrollContainer"
    :vertical="false"
    :noresize="true"
    class="scroll-container"
    @wheel.native.prevent="handleScroll"
    @scroll="scroll"
  >
    <slot />
  </el-scrollbar>
</template>

<script lang="ts" setup>
// TODO: check 功能是否开发完成

const tagAndTagSpacing = 4; // tagAndTagSpacing
const emits = defineEmits(["scroll"]);
const { ctx } = getCurrentInstance();
const scrollContainer = ref<InstanceType<typeof ElScrollbar>>();
const left = ref(0);
const scroll = () => {
  emits("scroll");
};
const handleScroll = (e) => {
  const eventDelta = e.wheelDelta || -e.deltaY * 40;
  scrollContainer.value!.setScrollLeft(
    scrollContainer.value!.scrollLeft + eventDelta / 4
  );
};

const moveToTarget = (currentTag) => {
  // 所有的组件都有一个属性$el:用于获取组件中的元素
  const $container = scrollContainer.value.$el;
  console.log($container);

  const $containerWidth = $container.offsetWidth;
  const tagList = ctx.parent.ctx.tagRefs;

  let firstTag = null;
  let lastTag = null;

  // find first tag and last tag
  if (tagList.length > 0) {
    firstTag = tagList[0];
    lastTag = tagList[tagList.length - 1];
  }

  if (firstTag === currentTag) {
    scrollContainer.value.scrollLeft = 0;
  } else if (lastTag === currentTag) {
    scrollContainer.value.scrollLeft =
      scrollContainer.value.scrollWidth - $containerWidth;
  } else {
    // find preTag and nextTag
    const currentIndex = tagList.findIndex((item) => item === currentTag);
    const prevTag = tagList[currentIndex - 1];
    const nextTag = tagList[currentIndex + 1];

    // the tag's offsetLeft after of nextTag
    const afterNextTagOffsetLeft =
      nextTag.$el.offsetLeft + nextTag.$el.offsetWidth + tagAndTagSpacing;

    // the tag's offsetLeft before of prevTag
    const beforePrevTagOffsetLeft = prevTag.$el.offsetLeft - tagAndTagSpacing;

    if (
      afterNextTagOffsetLeft >
      scrollContainer.value.scrollLeft + $containerWidth
    ) {
      scrollContainer.value.scrollLeft =
        afterNextTagOffsetLeft - $containerWidth;
    } else if (beforePrevTagOffsetLeft < scrollContainer.value.scrollLeft) {
      scrollContainer.value.scrollLeft = beforePrevTagOffsetLeft;
    }
  }
};
</script>

<style lang="scss" scoped>
.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;
  :deep(.el-scrollbar__bar) {
    bottom: 0px;
  }
  :deep(.el-scrollbar__wrap) {
    height: 49px;
  }
}
</style>

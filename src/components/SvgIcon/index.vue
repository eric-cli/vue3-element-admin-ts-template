<template>
  <div
    v-if="isExternals"
    v-bind="$attrs"
    :style="styleExternalIcon"
    class="svg-external-icon svg-icon"
  />
  <svg v-else :class="svgClass" aria-hidden="true" v-bind="$attrs">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script setup lang="ts">
  import { isExternal } from "@/utils/validate"

  const props = defineProps({
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ""
    }
  })
  const isExternals = computed(() => isExternal(props.iconClass))
  const iconName = computed(() => `#icon-${props.iconClass}`)
  const svgClass = computed(() => {
    if (props.className) {
      return `svg-icon ${props.className}`
    }
    return "svg-icon"
  })
  const styleExternalIcon = computed(() => {
    return {
      mask: `url(${props.iconClass}) no-repeat 50% 50%`,
      "-webkit-mask": `url(${props.iconClass}) no-repeat 50% 50%`
    }
  })
</script>

<style scoped>
  .svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
    box-sizing: content-box;
  }

  .svg-external-icon {
    background-color: currentColor;
    mask-size: cover !important;
    display: inline-block;
  }
</style>

<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script lang="ts" setup>
  import { isExternal } from "@/utils/validate"
  const props = defineProps({
    to: {
      type: String,
      required: true
    }
  })
  const type = computed(() => {
    if (isExternal(props.to)) {
      return "a"
    }
    return "router-link"
  })
  const linkProps = (to) => {
    if (isExternal(props.to)) {
      return {
        href: to,
        target: "_blank",
        rel: "noopener"
      }
    }
    return {
      to: to
    }
  }
</script>

<style lang="scss" scoped></style>

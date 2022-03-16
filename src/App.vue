<template>
  <el-config-provider :size="size" :locale="localLanguage">
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
  import elementlangEn from "element-plus/lib/locale/lang/en"
  import elementlangZhCn from "element-plus/lib/locale/lang/zh-cn"
  import useAppStore from "@/stores/app"

  type localType = "zh" | "en"
  const locale = ref<localType>("en")
  const appStore = useAppStore()

  const size: any = computed(() => {
    return appStore.size
  })
  const language = computed(() => {
    return appStore.language
  })
  const localLanguage = computed(() => {
    switch (locale.value) {
      case "en":
        return elementlangEn
      case "zh":
        return elementlangZhCn
      default:
        return elementlangZhCn
    }
  })
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* text-align: center; */
    color: #2c3e50;
  }
</style>

<template>
  <el-dropdown trigger="click" class="international" @command="handleSetLanguage">
    <el-row class="dropdown-top" align="middle">
      <svg-icon class-name="international-icon" icon-class="language" />
    </el-row>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :disabled="language === 'zh'" command="zh"> 中文 </el-dropdown-item>
        <el-dropdown-item :disabled="language === 'en'" command="en"> English </el-dropdown-item>
        <!-- <el-dropdown-item :disabled="language === 'es'" command="es"> Español </el-dropdown-item>
      <el-dropdown-item :disabled="language === 'ja'" command="ja"> 日本語 </el-dropdown-item> -->
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
  import useAppStore from "@/stores/app"

  const appStore = useAppStore()
  const language = computed(() => {
    return appStore.language
  })
  const handleSetLanguage = (lang) => {
    // this.$i18n.locale = lang
    appStore.setLanguage(lang)
    ElMessage({
      message: "Switch Language Success",
      type: "success"
    })
  }
</script>

<style lang="scss" scoped>
  .dropdown-top {
    height: 100%;
  }
</style>

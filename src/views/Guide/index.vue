<template>
  <div class="app-container">
    <aside>
      {{ $t("guide.description") }}
      <a href="https://github.com/kamranahmedse/driver.js" target="_blank">driver.js.</a>
    </aside>
    <el-button :icon="QuestionFilled" type="primary" @click.prevent.stop="guide">
      {{ $t("guide.button") }}
    </el-button>
  </div>
</template>

<script lang="ts" setup>
  import { QuestionFilled } from "@element-plus/icons-vue"
  import Driver from "driver.js" // import driver.js
  import "driver.js/dist/driver.min.css" // import driver.js css
  import steps from "./steps"

  let driver: any = ref(null)
  onMounted(() => {
    driver = new Driver()
  })
  const guide = () => {
    driver.defineSteps(steps)
    driver.start()
  }
</script>

<style lang="scss" scoped></style>

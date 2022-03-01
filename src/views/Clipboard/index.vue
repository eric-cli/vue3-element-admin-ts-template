<template>
  <div class="app-container">
    <el-tabs v-model="activeName">
      <el-tab-pane label="use clipboard  directly" name="directly">
        <el-input
          v-model="inputData"
          placeholder="Please input"
          style="width: 400px; max-width: 100%"
        />
        <el-button type="primary" :icon="Document" @click="handleCopy(inputData)"> copy </el-button>
      </el-tab-pane>
      <el-tab-pane label="use clipboard by v-directive" name="v-directive">
        <el-input
          v-model="inputData"
          placeholder="Please input"
          style="width: 400px; max-width: 100%"
        />
        <el-button v-clipboard="inputData" type="primary" :icon="Document"> copy </el-button>
        <!-- <el-button type="primary" :icon="Document"> copy </el-button> -->
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
  import { Document } from "@element-plus/icons-vue"
  import clip from "@/utils/clipboard" // use clipboard directly

  const activeName = ref("directly")
  const inputData = ref("https://github.com/EricLeeN1")
  const handleCopy = (text) => {
    clip(text)
  }
</script>

<style lang="scss" scoped></style>

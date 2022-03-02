<template>
  <div class="icons-container">
    <aside>
      <a
        href="https://panjiachen.github.io/vue-element-admin-site/guide/advanced/icon.html"
        target="_blank"
        >Add and use
      </a>
    </aside>
    <el-tabs type="border-card">
      <el-tab-pane label="Icons">
        <div class="grid">
          <div
            v-for="item of svgIcons"
            :key="item"
            @click="handleClipboard(generateIconCode(item))"
          >
            <el-tooltip placement="top">
              <template #content>
                {{ generateIconCode(item) }}
              </template>
              <el-row class="icon-item" align="middle">
                <svg-icon :icon-class="item" class-name="disabled" />
                <span>{{ item }}</span>
              </el-row>
            </el-tooltip>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Element-Plus-UI Icons">
        <div class="grid">
          <div
            v-for="item of elementIcons"
            :key="item"
            @click="handleClipboard(generateElementIconCode(item.name))"
          >
            <el-tooltip placement="top">
              <template #content>
                {{ generateElementIconCode(item.name) }}
              </template>
              <el-row class="icon-item" align="middle">
                <el-icon><EleIcons :icon="item.icon" /></el-icon>
                <span>{{ item.name }}</span>
              </el-row>
            </el-tooltip>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
  // TODO: add element-icon
  import clipboard from "@/utils/clipboard"
  import svgIcons from "./svg-icons"
  import elementIcons from "./element-icons"
  import EleIcons from "./EleIcons.vue"

  const generateIconCode = (symbol) => {
    return `<svg-icon icon-class="${symbol}" />`
  }
  const generateElementIconCode = (symbol) => {
    return `<el-icon><${symbol} /></el-icon>`
  }
  const handleClipboard = (text) => {
    clipboard(text)
  }
</script>

<style lang="scss" scoped>
  .icons-container {
    margin: 10px 20px 0;
    overflow: hidden;

    .grid {
      position: relative;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    }

    .icon-item {
      margin: 20px;
      height: 85px;
      width: 100px;
      font-size: 30px;
      color: #24292e;
      cursor: pointer;
      flex-direction: column;
    }

    span {
      display: block;
      font-size: 16px;
      margin-top: 10px;
    }

    .disabled {
      pointer-events: none;
    }
  }
</style>

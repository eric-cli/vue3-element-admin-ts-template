<template>
  <div class="block">
    <el-timeline>
      <el-timeline-item
        v-for="(item, index) of timeline"
        :key="index"
        :timestamp="item.timestamp"
        placement="top"
      >
        <el-card>
          <h4>{{ item.title }}</h4>
          <p>{{ item.content }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script lang="ts" setup>
const timeline = [
  {
    timestamp: "2022/2/04",
    title: "Update Github template",
    content: "EricLee committed 2022/2/04 20:46",
  },
  {
    timestamp: "2022/2/06",
    title: "Update Github template",
    content: "EricLee committed 2022/2/06 20:46",
  },
  {
    timestamp: "2022/2/12",
    title: "Build Template",
    content: "EricLee committed 2022/2/12 20:46",
  },
  {
    timestamp: "2022/2/13",
    title: "Release New Version",
    content: "EricLee committed 2022/2/13 20:46",
  },
];
</script>

<style lang="scss" scoped></style>

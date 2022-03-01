<template>
  <div class="tab-container">
    <el-tag>mounted times ：{{ createdTimes }}</el-tag>
    <el-alert
      :closable="false"
      style="width: 200px; display: inline-block; vertical-align: middle; margin-left: 30px"
      title="Tab with keep-alive"
      type="success"
    />
    <el-tabs v-model="activeName" style="margin-top: 15px" type="border-card">
      <el-tab-pane
        v-for="item in tabMapOptions"
        :key="item.key"
        :label="item.label"
        :name="item.key"
      >
        <keep-alive>
          <tab-pane v-if="activeName == item.key" :type="item.key" @create="showCreatedTimes" />
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
  import TabPane from "./components/TabPane.vue"
  const route = useRoute()
  const router = useRouter()
  const tabMapOptions = [
    { label: "China", key: "CN" },
    { label: "USA", key: "US" },
    { label: "Japan", key: "JP" },
    { label: "Eurozone", key: "EU" }
  ]
  const activeName: any = ref("CN")
  const createdTimes = ref(0)
  const showCreatedTimes = () => {
    createdTimes.value = createdTimes.value + 1
  }
  watch(
    activeName,
    (val) => {
      console.log(val)
      router.push(`${route.path}?tab=${val}`)
    },
    { immediate: true }
  )
  onMounted(() => {
    // init the default selected tab
    const tab = route.query.tab
    if (tab) {
      activeName.value = tab
    }
  })
</script>

<style lang="scss" scoped>
  .tab-container {
    margin: 30px;
  }
</style>

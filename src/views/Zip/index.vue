<template>
  <el-row class="app-container">
    <el-input
      v-model="filename"
      placeholder="Please enter the file name (default file)"
      style="width: 300px"
      prefix-icon="el-icon-document"
    />
    <el-button
      :loading="downloadLoading"
      style="margin-bottom: 20px"
      type="primary"
      :icon="Document"
      @click="handleDownload"
    >
      Export Zip
    </el-button>
  </el-row>
  <el-table
    v-loading="listLoading"
    :data="list"
    element-loading-text="拼命加载中"
    border
    fit
    highlight-current-row
  >
    <el-table-column align="center" label="ID" width="95">
      <template #default="scope">
        {{ scope.$index }}
      </template>
    </el-table-column>
    <el-table-column label="Title">
      <template #default="{ row }">
        {{ row.title }}
      </template>
    </el-table-column>
    <el-table-column label="Author" width="95" align="center">
      <template #default="{ row }">
        <el-tag>{{ row.author }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="Readings" width="115" align="center">
      <template #default="{ row }">
        {{ row.pageviews }}
      </template>
    </el-table-column>
    <el-table-column align="center" label="Date" width="220">
      <template #default="{ row }">
        <i class="el-icon-time" />
        <span>{{ row.display_time }}</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
  import { Document } from "@element-plus/icons-vue"
  import { fetchList } from "@/apis/article"
  let list = ref([])
  let listLoading = ref(true)
  let downloadLoading = ref(false)
  let filename = ref("")

  const fetchData = async () => {
    listLoading.value = true
    const { data } = await fetchList()
    list.value = data.lists
    listLoading.value = false
  }

  const formatJson = (filterVal, jsonData) => {
    return jsonData.map((v) => filterVal.map((j) => v[j]))
  }

  const handleDownload = () => {
    downloadLoading.value = true
    import("@/vendor/Export2Zip").then((zip) => {
      const tHeader = ["Id", "Title", "Author", "Readings", "Date"]
      const filterVal = ["id", "title", "author", "pageviews", "display_time"]
      const data = formatJson(filterVal, list.value)
      zip.export_txt_to_zip(tHeader, data, filename, filename)
      downloadLoading.value = false
    })
  }

  onMounted(() => {
    fetchData()
  })
</script>

<style lang="scss" scoped></style>

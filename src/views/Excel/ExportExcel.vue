<template>
  <div class="app-container">
    <el-row class="mb-20px" align="middle">
      <FilenameOption v-model="filename" />
      <AutoWidthOption v-model="autoWidth" />
      <BookTypeOption v-model="bookType" />
      <el-button
        :loading="downloadLoading"
        style="margin-left: 20px"
        type="primary"
        :icon="Document"
        @click="handleDownload"
      >
        Export Excel
      </el-button>
      <a
        href="https://panjiachen.github.io/vue-element-admin-site/feature/component/excel.html"
        target="_blank"
        style="margin-left: 15px"
      >
        <el-tag type="info">Documentation</el-tag>
      </a>
    </el-row>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading..."
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="Id" width="95">
        <template #default="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="Title">
        <template #default="{ row }">
          {{ row.title }}
        </template>
      </el-table-column>
      <el-table-column label="Author" width="110" align="center">
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
          <span>{{ parseTime(row.timestamp, "{y}-{m}-{d} {h}:{i}") }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
  import { Document } from "@element-plus/icons-vue"
  import FilenameOption from "./components/FilenameOption.vue"
  import AutoWidthOption from "./components/AutoWidthOption.vue"
  import BookTypeOption from "./components/BookTypeOption.vue"
  import { parseTime } from "@/utils"
  import { fetchList } from "@/apis/article"

  const list = ref([])
  const listLoading = ref(true)
  const downloadLoading = ref(false)
  const filename = ref("")
  const autoWidth: any = ref(true)
  const bookType = ref("xlsx")
  const fetchData = () => {
    listLoading.value = true
    fetchList().then((res) => {
      list.value = res.data.lists
      listLoading.value = false
    })
  }
  const formatJson = (filterVal, jsonData) => {
    return jsonData.map((v) =>
      filterVal.map((j) => {
        if (j === "timestamp") {
          return parseTime(v[j])
        }
        return v[j]
      })
    )
  }
  const handleDownload = () => {
    downloadLoading.value = true
    import("@/vendor/Export2Excel").then((excel) => {
      const tHeader = ["Id", "Title", "Author", "Readings", "Date"]
      const filterVal = ["id", "title", "author", "pageviews", "display_time"]
      const data = formatJson(filterVal, list.value)
      excel.export_json_to_excel({
        header: tHeader,
        data,
        filename: filename.value,
        autoWidth: autoWidth.value,
        bookType: bookType.value
      })
      downloadLoading.value = false
    })
  }

  onMounted(() => {
    fetchData()
  })
</script>

<style lang="scss" scoped></style>

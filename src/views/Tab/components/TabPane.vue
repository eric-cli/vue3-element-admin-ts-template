<template>
  <el-table :data="list" border fit highlight-current-row style="width: 100%">
    <el-table-column
      v-loading="loading"
      align="center"
      label="ID"
      width="65"
      element-loading-text="请给我点时间！"
    >
      <template #default="{ row }">
        <span>{{ row.id }}</span>
      </template>
    </el-table-column>

    <el-table-column width="180px" align="center" label="Date">
      <template #default="{ row }">
        <span>{{ parseTime(row.timestamp, "{y}-{m}-{d} {h}:{i}") }}</span>
      </template>
    </el-table-column>

    <el-table-column min-width="300px" label="Title">
      <template #default="{ row }">
        <span>{{ row.title }}</span>
        <el-tag>{{ row.type }}</el-tag>
      </template>
    </el-table-column>

    <el-table-column width="110px" align="center" label="Author">
      <template #default="{ row }">
        <span>{{ row.author }}</span>
      </template>
    </el-table-column>

    <el-table-column width="120px" label="Importance">
      <template #default="{ row }">
        <el-row align="middle"
          ><svg-icon v-for="n in +row.importance" :key="n" icon-class="star"
        /></el-row>
      </template>
    </el-table-column>

    <el-table-column align="center" label="Readings" width="95">
      <template #default="{ row }">
        <span>{{ row.pageviews }}</span>
      </template>
    </el-table-column>

    <el-table-column class-name="status-col" label="Status" width="110">
      <template #default="{ row }">
        <el-tag :type="statusFilter(row.status)">
          {{ row.status }}
        </el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
  import { fetchList } from "@/apis/article"
  import { parseTime } from "@/utils"
  const props = defineProps({
    type: {
      type: String,
      default: "CN"
    }
  })
  const list = ref([])
  const loading = ref(false)
  const listQuery = ref({
    page: 1,
    limit: 5,
    type: props.type,
    sort: "+id"
  })
  const emits = defineEmits(["create"])
  const getList = () => {
    loading.value = true
    emits("create") // for test
    fetchList(listQuery.value).then((res) => {
      list.value = res.data.lists
      loading.value = false
    })
  }

  const statusFilter = (status) => {
    const statusMap = {
      published: "success",
      draft: "info",
      deleted: "danger"
    }
    return statusMap[status]
  }

  onMounted(() => {
    getList()
  })
</script>

<style lang="scss" scoped></style>

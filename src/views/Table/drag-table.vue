<template>
  <div class="app-container">
    <!-- Note that row-key is necessary to get a correct row order. -->
    <el-table
      ref="dragTable"
      v-loading="listLoading"
      :data="list"
      row-key="id"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column align="center" label="ID" width="65">
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
        </template>
      </el-table-column>

      <el-table-column width="110px" align="center" label="Author">
        <template #default="{ row }">
          <span>{{ row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" label="Importance">
        <template #default="{ row }">
          <el-row align="middle"
            ><svg-icon v-for="n in +row.importance" :key="n" icon-class="star" class="icon-star"
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

      <el-table-column align="center" label="Drag" width="80">
        <template #default="{}">
          <svg-icon class="drag-handler" icon-class="drag" />
        </template>
      </el-table-column>
    </el-table>
    <div class="show-d">
      <el-tag>{{ $t("table.dragTips1") }}:</el-tag> {{ oldList }}
    </div>
    <div class="show-d">
      <el-tag>{{ $t("table.dragTips2") }}:</el-tag> {{ newList }}
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { ElTable } from "element-plus"
  import Sortable from "sortablejs"
  import { parseTime } from "@/utils"
  import { fetchList } from "@/apis/article"
  // https://www.npmjs.com/package/sortablejs

  const statusFilter = (status) => {
    const statusMap = {
      published: "success",
      draft: "info",
      deleted: "danger"
    }
    return statusMap[status]
  }

  const list = ref([])
  const total = ref(0)
  const listLoading = ref(false)
  const listQuery = ref({ page: 1, limit: 10 })
  const sortable = ref(null)
  const dragTable = ref<InstanceType<typeof ElTable>>()
  const oldList: any = ref([])
  const newList = ref([])

  const setSort = () => {
    const el = dragTable.value?.$el.querySelectorAll(".el-table__body-wrapper table > tbody")[0]
    console.log(el)

    sortable.value = Sortable.create(el, {
      ghostClass: "sortable-ghost", // Class name for the drop placeholder,
      setData(dataTransfer) {
        // to avoid Firefox bug
        // Detail see : https://github.com/RubaXa/Sortable/issues/1012
        dataTransfer.setData("Text", "")
      },
      onEnd: (evt) => {
        const targetRow = list.value.splice(evt.oldIndex, 1)[0]
        list.value.splice(evt.newIndex, 0, targetRow)

        // for show the changes, you can delete in you code
        const tempIndex = newList.value.splice(evt.oldIndex, 1)[0]
        newList.value.splice(evt.newIndex, 0, tempIndex)
      }
    })
  }
  const getList = async () => {
    listLoading.value = true
    const { data } = await fetchList(listQuery.value)
    list.value = data.lists
    total.value = data.total
    listLoading.value = false
    oldList.value = list.value.map((v) => v.id)
    newList.value = oldList.value.slice()
    nextTick(() => {
      setSort()
    })
  }

  onMounted(() => {
    getList()
  })
</script>
<style>
  .sortable-ghost {
    opacity: 0.8;
    color: #fff !important;
    background: #42b983 !important;
  }
</style>
<style lang="scss" scoped>
  .icon-star {
    margin-right: 2px;
  }
  .drag-handler {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
  .show-d {
    margin-top: 15px;
  }
</style>

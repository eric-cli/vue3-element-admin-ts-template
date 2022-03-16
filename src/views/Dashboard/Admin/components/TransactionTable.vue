<template>
  <el-table :data="list" style="width: 100%; padding-top: 15px">
    <el-table-column label="Order_No" min-width="200">
      <template #default="{ row }">
        {{ orderNoFilter(row.order_no) }}
      </template>
    </el-table-column>
    <el-table-column label="Price" width="195" align="center">
      <template #default="{ row }"> ¥{{ toThousandFilter(row.price) }} </template>
    </el-table-column>
    <el-table-column label="Status" width="100" align="center">
      <template #default="{ row }">
        <el-tag :type="statusFilter(row.status)">
          {{ row.status }}
        </el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
  import { transactionList } from "@/apis/remote-search"
  import { toThousandFilter } from "@/filters"

  const list = ref([])
  // TODO 使用reactive包裹时,直接list = res.data.lists.slice(0, 8) 会使list失去响应式
  const fetchData = () => {
    transactionList().then((res) => {
      list.value = res.data.lists.slice(0, 8)
    })
  }
  const statusFilter = (status: any): StatusFilterType => {
    const statusMap = {
      success: "success",
      pending: "danger"
    }
    return statusMap[status]
  }

  const orderNoFilter = (str: string) => {
    return str.substring(0, 30)
  }
  onBeforeMount(() => {
    fetchData()
  })
</script>

<style lang="scss" scoped></style>

<template>
  <div class="app-container">
    <el-button
      :loading="downloadLoading"
      style="margin-bottom: 20px"
      type="primary"
      :icon="Document"
      @click="handleDownload"
      >Export</el-button
    >

    <el-table
      ref="multipleTable"
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="Id" width="95">
        <template #default="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="Main Information" align="center">
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
import { Document } from "@element-plus/icons-vue";
import { fetchList } from "@/apis/article";
import type { ElTable } from "element-plus";
import { parseTime } from "@/utils";
const multipleTable = ref<InstanceType<typeof ElTable>>();
let list = ref([]);
let listLoading = ref(true);
let downloadLoading = ref(false);
const fetchData = () => {
  listLoading.value = true;
  fetchList().then((res) => {
    list.value = res.data.lists;
    listLoading.value = false;
  });
};
const formatJson = (filterVal, jsonData) => {
  return jsonData.map((v) =>
    filterVal.map((j) => {
      if (j === "timestamp") {
        return parseTime(v[j]);
      } else {
        return v[j];
      }
    })
  );
};
const handleDownload = () => {
  downloadLoading.value = true;
  import("@/vendor/Export2Excel").then((excel) => {
    const multiHeader: any = [["Id", "Main Information", "", "", "Date"]];
    const header: any = ["", "Title", "Author", "Readings", ""];
    const filterVal = ["id", "title", "author", "pageviews", "display_time"];
    const data: any = formatJson(filterVal, list.value);
    const merges: any = ["A1:A2", "B1:D1", "E1:E2"];
    excel.export_json_to_excel({
      multiHeader,
      header,
      merges,
      data,
    });
    downloadLoading.value = false;
  });
};
onMounted(() => {
  fetchData();
});
</script>

<style lang="scss" scoped></style>

<template>
  <div class="app-container">
    <el-input
      v-model="filename"
      placeholder="Please enter the file name (default excel-list)"
      style="width: 350px"
      :prefix-icon="Document"
    />
    <el-button
      :loading="downloadLoading"
      style="margin-left: 20px"
      type="primary"
      :icon="Document"
      @click="handleDownload"
    >
      Export Selected Items
    </el-button>
    <a
      href="https://panjiachen.github.io/vue-element-admin-site/feature/component/excel.html"
      target="_blank"
      style="margin-left: 15px"
    >
      <el-tag type="info">Documentation</el-tag>
    </a>
    <el-table
      class="mt-20px"
      ref="multipleTable"
      v-loading="listLoading"
      :data="list"
      element-loading-text="拼命加载中"
      border
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" align="center" />
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
      <el-table-column align="center" label="PDate" width="220">
        <template #default="{ row }">
          <i class="el-icon-time" />
          <span>{{ row.display_time }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { fetchList } from "@/apis/article";
import type { ElTable } from "element-plus";
import { Document } from "@element-plus/icons-vue";
import { parseTime } from "@/utils";
let list = ref([]);
let listLoading = ref(true);
let downloadLoading = ref(false);
let filename = ref("");
let multipleSelection = ref([]);
const multipleTable = ref<InstanceType<typeof ElTable>>();
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
const handleSelectionChange = (val) => {
  multipleSelection.value = val;
};
const handleDownload = () => {
  if (multipleSelection.value.length) {
    downloadLoading.value = true;
    import("@/vendor/Export2Excel").then((excel) => {
      const tHeader = ["Id", "Title", "Author", "Readings", "Date"];
      const filterVal = ["id", "title", "author", "pageviews", "display_time"];
      const data = formatJson(filterVal, multipleSelection.value);
      excel.export_json_to_excel({
        header: tHeader,
        data,
        filename: filename.value,
      });
      multipleTable.value!.clearSelection();
      downloadLoading.value = false;
    });
  } else {
    ElMessage({
      message: "Please select at least one item",
      type: "warning",
    });
  }
};
onMounted(() => {
  fetchData();
});
</script>

<style lang="scss" scoped></style>

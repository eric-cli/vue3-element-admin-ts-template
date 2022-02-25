<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column align="center" label="ID" width="80">
        <template #default="{ row }">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="Date">
        <template #default="{ row }">
          <span>{{ parseTime(row.timestamp, "{y}-{m}-{d} {h}:{i}") }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="Author">
        <template #default="{ row }">
          <span>{{ row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" label="Importance">
        <template #default="{ row }">
          <el-row align="middle">
            <svg-icon
              v-for="n in +row.importance"
              :key="n"
              icon-class="star"
              class="meta-item__icon"
            />
          </el-row>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="Status" width="110">
        <template #default="{ row }">
          <el-tag :type="statusFilter(row.status)">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column min-width="300px" label="Title">
        <template #default="{ row }">
          <router-link :to="'/example/edit/' + row.id" class="link-type">
            <span>{{ row.title }}</span>
          </router-link>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Actions" width="120">
        <template #default="{ row }">
          <router-link :to="'/example/edit/' + row.id">
            <el-button type="primary" size="small" :icon="Edit">
              Edit
            </el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      v-model:page="listQuery.page"
      v-model:limit="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script setup lang="ts">
// TODO 分页组件
import { Edit } from "@element-plus/icons-vue";
import { fetchList } from "@/apis/article";
import Pagination from "@/components/Pagination/index.vue"; // Secondary package based on el-pagination
import { parseTime } from "@/utils";
const listQuery = ref({ page: 1, limit: 20 });
const listLoading = ref(true);
const total = ref(0);
const list = ref([]);
const getList = () => {
  listLoading.value = true;
  fetchList(listQuery.value).then((res) => {
    list.value = res.data.lists;
    total.value = res.data.total;
    listLoading.value = false;
  });
};
const statusFilter = (status) => {
  const statusMap = {
    published: "success",
    draft: "info",
    deleted: "danger",
  };
  return statusMap[status];
};
onMounted(() => {
  getList();
});
</script>

<style lang="scss" scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>

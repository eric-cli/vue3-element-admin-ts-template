<template>
  <div class="app-container">
    <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
    <el-table :data="tableData" border highlight-current-row style="width: 100%; margin-top: 20px">
      <el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" />
    </el-table>
  </div>
</template>

<script setup lang="ts">
  import UploadExcelComponent from "@/components/UploadExcel/index.vue"
  const tableData = ref([])
  const tableHeader = ref([])
  const beforeUpload = (file) => {
    const isLt1M = file.size / 1024 / 1024 < 1

    if (isLt1M) {
      return true
    }

    ElMessage({
      message: "Please do not upload files larger than 1m in size.",
      type: "warning"
    })
    return false
  }
  const handleSuccess = ({ results, header }) => {
    tableData.value = results
    tableHeader.value = header
  }
</script>

<style lang="scss" scoped></style>

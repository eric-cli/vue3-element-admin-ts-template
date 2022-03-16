<template>
  <div class="app-container">
    <el-row class="filter-container" align="middle">
      <el-input
        v-model="listQuery.title"
        :placeholder="$t('table.title')"
        style="width: 200px"
        class="filter-item"
        @keyup.enter="handleFilter"
      />
      <el-select
        v-model="listQuery.importance"
        :placeholder="$t('table.importance')"
        clearable
        style="width: 90px"
        class="filter-item"
      >
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select
        v-model="listQuery.type"
        :placeholder="$t('table.type')"
        clearable
        class="filter-item"
        style="width: 130px"
      >
        <el-option
          v-for="item in calendarTypeOptions"
          :key="item.key"
          :label="item.display_name + '(' + item.key + ')'"
          :value="item.key"
        />
      </el-select>
      <el-select
        v-model="listQuery.sort"
        :placeholder="$t('table.sort')"
        style="width: 140px"
        class="filter-item"
        @change="handleFilter"
      >
        <el-option
          v-for="item in sortOptions"
          :key="item.key"
          :label="item.label"
          :value="item.key"
        />
      </el-select>
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >
        {{ $t("table.search") }}
      </el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >
        {{ $t("table.add") }}
      </el-button>
      <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >
        {{ $t("table.export") }}
      </el-button>
      <el-checkbox
        v-model="showReviewer"
        class="filter-item"
        style="margin-left: 15px"
        @change="tableKey = tableKey + 1"
      >
        {{ $t("table.reviewer") }}
      </el-checkbox>
    </el-row>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
      @sort-change="sortChange"
    >
      <el-table-column
        label="ID"
        prop="id"
        sortable="custom"
        align="center"
        width="80"
        :class-name="getSortClass('id')"
      >
        <template #default="{ row }">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Date" width="150px" align="center">
        <template #default="{ row }">
          <span>{{ parseTime(row.timestamp, "{y}-{m}-{d} {h}:{i}") }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Title" min-width="150px">
        <template #default="{ row }">
          <span class="link-type" @click="handleUpdate(row)">{{ row.title }}</span>
          <el-tag>{{ typeFilter(row.type) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Author" width="110px" align="center">
        <template #default="{ row }">
          <span>{{ row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="showReviewer" label="Reviewer" width="110px" align="center">
        <template #default="{ row }">
          <span style="color: red">{{ row.reviewer }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Imp" width="80px">
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
      <el-table-column label="Readings" align="center" width="95">
        <template #default="{ row }">
          <span v-if="row.pageviews" class="link-type" @click="handleFetchPv(row.pageviews)">{{
            row.pageviews
          }}</span>
          <span v-else>0</span>
        </template>
      </el-table-column>
      <el-table-column label="Status" class-name="status-col" width="100">
        <template #default="{ row }">
          <el-tag :type="statusFilter(row.status)">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="Actions"
        align="center"
        width="230"
        class-name="small-padding fixed-width"
      >
        <template #default="{ row, $index }">
          <el-button type="primary" size="small" @click="handleUpdate(row)"> Edit </el-button>
          <el-button
            v-if="row.status != 'published'"
            size="small"
            type="success"
            @click="handleModifyStatus(row, 'published')"
          >
            Publish
          </el-button>
          <el-button
            v-if="row.status != 'draft'"
            size="small"
            @click="handleModifyStatus(row, 'draft')"
          >
            Draft
          </el-button>
          <el-button
            v-if="row.status != 'deleted'"
            size="small"
            type="danger"
            @click="handleDelete(row, $index)"
          >
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      v-model:page="listQuery.page"
      v-model:limit="listQuery.limit"
      :total="total"
      @pagination="getList"
    />

    <el-dialog v-model="dialogFormVisible" :title="textMap[dialogStatus]">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left: 50px"
      >
        <el-form-item label="Type" prop="type">
          <el-select v-model="temp.type" class="filter-item" placeholder="Please select">
            <el-option
              v-for="item in calendarTypeOptions"
              :key="item.key"
              :label="item.display_name"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Date" prop="timestamp">
          <el-date-picker
            v-model="temp.timestamp"
            type="datetime"
            placeholder="Please pick a date"
          />
        </el-form-item>
        <el-form-item label="Title" prop="title">
          <el-input v-model="temp.title" />
        </el-form-item>
        <el-form-item label="Status">
          <el-select v-model="temp.status" class="filter-item" placeholder="Please select">
            <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="Imp">
          <el-rate
            v-model="temp.importance"
            :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
            :max="3"
            style="margin-top: 8px"
          />
        </el-form-item>
        <el-form-item label="Remark">
          <el-input
            v-model="temp.remark"
            :autosize="{ minRows: 2, maxRows: 4 }"
            type="textarea"
            placeholder="Please input"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogFormVisible = false"> Cancel </el-button>
        <el-button type="primary" @click="dialogStatus === 'create' ? createData() : updateData()">
          {{ $t("table.confirm") }}
        </el-button>
      </template>
    </el-dialog>

    <el-dialog v-model="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <template #footer>
        <el-button type="primary" @click="dialogPvVisible = false">Confirm</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
  import type { ElForm } from "element-plus"
  import { ElNotification } from "element-plus"
  import { fetchList, fetchPv, createArticle, updateArticle } from "@/apis/article"
  import { parseTime } from "@/utils"

  type FormInstance = InstanceType<typeof ElForm>
  const dataForm = ref<FormInstance>()
  const calendarTypeOptions = ref([
    { key: "CN", display_name: "China" },
    { key: "US", display_name: "USA" },
    { key: "JP", display_name: "Japan" },
    { key: "EU", display_name: "Eurozone" }
  ])
  const tableKey: any = ref(0)
  const list: any = ref([])
  const total = ref(0)
  const listLoading = ref(true)
  const listQuery = ref({
    page: 1,
    limit: 20,
    importance: "",
    title: "",
    type: "",
    sort: "+id"
  })
  const importanceOptions = ref([1, 2, 3])
  const sortOptions = ref([
    { label: "ID Ascending", key: "+id" },
    { label: "ID Descending", key: "-id" }
  ])
  const statusOptions = ref(["published", "draft", "deleted"])
  const showReviewer = ref(false)
  let temp: any = reactive({
    id: 1,
    importance: 1,
    remark: "",
    timestamp: new Date(),
    title: "",
    type: "",
    status: "published"
  })
  const dialogFormVisible = ref(false)
  const dialogPvVisible = ref(false)
  const downloadLoading = ref(false)
  const dialogStatus = ref("")
  const pvData = ref([])
  const textMap = ref({ update: "Edit", create: "Create" })
  const rules: any = ref({
    type: [{ required: true, message: "type is required", trigger: "change" }],
    timestamp: [
      {
        type: "date",
        required: true,
        message: "timestamp is required",
        trigger: "change"
      }
    ],
    title: [{ required: true, message: "title is required", trigger: "blur" }]
  })
  // arr to obj, such as { CN : "China", US : "USA" }
  const calendarTypeKeyValue = calendarTypeOptions.value.reduce((acc, cur) => {
    acc[cur.key] = cur.display_name
    return acc
  }, {})

  const statusFilter = (status) => {
    const statusMap = {
      published: "success",
      draft: "info",
      deleted: "danger"
    }
    return statusMap[status]
  }

  const typeFilter = (type) => {
    return calendarTypeKeyValue[type]
  }

  const getList = () => {
    listLoading.value = true
    fetchList(listQuery.value).then((res) => {
      list.value = res.data.lists
      total.value = res.data.total

      // Just to simulate the time of the request
      setTimeout(() => {
        listLoading.value = false
      }, 1.5 * 1000)
    })
  }
  const handleFilter = () => {
    listQuery.value.page = 1
    getList()
  }
  const handleModifyStatus = (row, status) => {
    ElMessage({
      message: "操作Success",
      type: "success"
    })
    row.status = status
  }
  const sortByID = (order) => {
    if (order === "ascending") {
      listQuery.value.sort = "+id"
    } else {
      listQuery.value.sort = "-id"
    }
    handleFilter()
  }
  const resetTemp = () => {
    temp = {
      id: 1,
      importance: 1,
      remark: "",
      timestamp: new Date(),
      title: "",
      status: "published",
      type: ""
    }
  }
  const handleCreate = () => {
    resetTemp()
    dialogStatus.value = "create"
    dialogFormVisible.value = true
    nextTick(() => {
      dataForm.value?.clearValidate()
    })
  }
  const createData = () => {
    dataForm.value?.validate((valid) => {
      if (valid) {
        temp.id = parseInt(`${Math.random() * 100}`, 10) + 1024 // mock a id
        temp.author = "vue-element-admin"
        createArticle(temp).then(() => {
          list.value.unshift(temp)
          dialogFormVisible.value = false
          ElNotification({
            title: "Success",
            message: "Created Successfully",
            type: "success",
            duration: 2000
          })
        })
      }
    })
  }
  const handleUpdate = (row) => {
    temp = { ...row } // copy obj
    temp.timestamp = new Date(temp.timestamp)
    dialogStatus.value = "update"
    dialogFormVisible.value = true
    nextTick(() => {
      dataForm.value?.clearValidate()
    })
  }
  const updateData = () => {
    dataForm.value?.validate((valid) => {
      if (valid) {
        const tempData = { ...temp }
        tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
        updateArticle(tempData).then(() => {
          const index = list.value.findIndex((v) => v.id === temp.id)
          list.value.splice(index, 1, temp)
          dialogFormVisible.value = false
          ElNotification({
            title: "Success",
            message: "Update Successfully",
            type: "success",
            duration: 2000
          })
        })
      }
    })
  }
  const handleDelete = (row, index) => {
    ElNotification({
      title: "Success",
      message: "Delete Successfully",
      type: "success",
      duration: 2000
    })
    list.value.splice(index, 1)
  }
  const handleFetchPv = (pv) => {
    fetchPv(pv).then((response) => {
      pvData.value = response.data.pvData
      dialogPvVisible.value = true
    })
  }
  const formatJson = (filterVal) => {
    return list.value.map((v) =>
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
      const tHeader = ["timestamp", "title", "type", "importance", "status"]
      const filterVal = ["timestamp", "title", "type", "importance", "status"]
      const data = formatJson(filterVal)
      excel.export_json_to_excel({
        header: tHeader,
        data,
        filename: "table-list"
      })
      downloadLoading.value = false
    })
  }
  const getSortClass = (key) => {
    const { sort } = listQuery.value
    return sort === `+${key}` ? "ascending" : "descending"
  }
  const sortChange = (data) => {
    const { prop, order } = data
    if (prop === "id") {
      sortByID(order)
    }
  }
  onMounted(() => {
    getList()
  })
</script>

<style lang="scss" scoped>
  .filter-container {
    padding-bottom: 10px;

    .filter-item {
      margin-right: 10px;
    }
  }
</style>

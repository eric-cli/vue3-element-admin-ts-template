<template>
  <div v-if="errorLogs.length > 0">
    <el-badge
      :is-dot="true"
      style="line-height: 25px; margin-top: -5px"
      @click="dialogTableVisible = true"
    >
      <el-button style="padding: 8px 10px" size="small" type="danger">
        <svg-icon icon-class="bug" />
      </el-button>
    </el-badge>

    <el-dialog v-model="dialogTableVisible" width="80%" append-to-body>
      <template #title>
        <span style="padding-right: 10px">Error Log</span>
        <el-button size="small" type="primary" :icon="Delete" @click="clearAll"
          >Clear All</el-button
        >
      </template>
      <el-table :data="errorLogs" border>
        <el-table-column label="Message">
          <template #default="{ row }">
            <el-row align="middle">
              <span class="message-title">Msg:</span>
              <el-tag type="danger">
                {{ row.err.message }}
              </el-tag>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column label="Info">
          <template #default="{ row }">
            <el-row align="middle">
              <span class="message-title" style="padding-right: 10px">Info: </span>
              <!-- <el-tag type="warning"> {{ row.vm.$vnode.tag }} error in {{ row.info }} </el-tag> -->
              <el-tag type="warning"> {{ row.vm }} error in {{ row.info }} </el-tag>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column label="Url">
          <template #default="{ row }">
            <el-row align="middle">
              <span class="message-title" style="padding-right: 16px">Url: </span>
              <el-tag type="success">
                {{ row.url }}
              </el-tag>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column label="Stack">
          <template #default="{ row }">
            {{ row.err.stack }}
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
  import { Delete } from "@element-plus/icons-vue"
  import useAppStore from "@/stores/app"

  const dialogTableVisible = ref(false)
  const appStore = useAppStore()
  const errorLogs = computed(() => {
    return appStore.logs
  })
  console.log(errorLogs.value)

  const clearAll = () => {
    dialogTableVisible.value = false
    appStore.clearErrorLog()
  }
</script>

<style lang="scss" scoped></style>

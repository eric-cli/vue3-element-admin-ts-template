<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">
        <el-col :span="6" :xs="24">
          <UserCard :user="user" />
        </el-col>

        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="Activity" name="activity">
                <Activity />
              </el-tab-pane>
              <el-tab-pane label="Timeline" name="timeline">
                <Timeline />
              </el-tab-pane>
              <el-tab-pane label="Account" name="account">
                <Account :user="user" />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import Account from "./components/Account.vue"
  import Activity from "./components/Activity.vue"
  import Timeline from "./components/Timeline.vue"
  import UserCard from "./components/UserCard.vue"
  import useUserStore from "@/stores/user"

  const userStore = useUserStore()
  const user = computed(() => {
    return userStore.userInfos
  })
  const activeTab = ref("activity")
</script>

<style lang="scss" scoped></style>

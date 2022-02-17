<template>
  <div class="navbar">
    <Hamburger
      id="hamburger-container"
      :is-active="opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
    <Breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    <div class="right-menu">
      <template v-if="device !== 'mobile'">
        <!-- TODO: 添加search组件 -->
        <!-- <Search id="header-search" class="right-menu-item" /> -->

        <ErrorLog class="errLog-container right-menu-item hover-effect" />

        <Screenfull id="screenfull" class="right-menu-item hover-effect" />

        <el-tooltip content="Global Size" effect="dark" placement="bottom">
          <size-select id="size-select" class="right-menu-item hover-effect" />
        </el-tooltip>
      </template>
      <el-dropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="click"
      >
        <el-row class="avatar-wrapper" align="middle">
          <el-avatar :size="40" fit="fill" :src="avatar"></el-avatar>
          <CaretBottom class="caret-bottom" />
        </el-row>
        <template #dropdown>
          <el-dropdown-menu>
            <router-link to="/profile/index">
              <el-dropdown-item>Profile</el-dropdown-item>
            </router-link>
            <router-link to="/">
              <el-dropdown-item>Dashboard</el-dropdown-item>
            </router-link>
            <a
              target="_blank"
              href="https://github.com/eric-cli/vue3-element-admin-ts-template.git"
            >
              <el-dropdown-item>Github</el-dropdown-item>
            </a>
            <a
              target="_blank"
              href="https://panjiachen.github.io/vue-element-admin-site/#/"
            >
              <el-dropdown-item>Docs</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click.native="logout">
              <span style="display: block">Log Out</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import useAppStore from "@/stores/app";
import useUserStore from "@/stores/user";
const appStore = useAppStore();
const userStore = useUserStore();
const router = useRouter();
const route = useRoute();
import Hamburger from "@/components/Hamburger/index.vue";
import Breadcrumb from "@/components/Breadcrumb/index.vue";
import Search from "@/components/HeaderSearch/index.vue";
import SizeSelect from "@/components/SizeSelect/index.vue";
import Screenfull from "@/components/Screenfull/index.vue";
import ErrorLog from "@/components/ErrorLog/index.vue";
import { CaretBottom } from "@element-plus/icons-vue";

const opened = computed(() => {
  return appStore.opened;
});

const avatar = computed(() => {
  return userStore.avatar;
});

const device = computed(() => {
  return appStore.device;
});

const toggleSideBar = () => {
  appStore.toggleSideBar();
};

const logout = async () => {
  await userStore.logout();
  router.push(`/login?redirect=${route.fullPath}`);
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      padding: 0 8px;
      height: 100%;
      line-height: 50px;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        height: 100%;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 50%;
          transform: translate(0, -50%);
          font-size: 12px;
          height: 20px;
          width: 20px;
        }
      }
    }
  }
}
</style>

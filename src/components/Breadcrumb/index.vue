<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span
          v-if="item.redirect === 'noRedirect' || index == levelList.length - 1"
          class="no-redirect"
          >{{ item.meta.title }}</span
        >
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
  import { compile } from "path-to-regexp"
  // TODO 代码优化
  const levelList: any = ref([])
  const route = useRoute()
  const router = useRouter()
  const isDashboard = (route) => {
    const name = route && route.name
    if (!name) {
      return false
    }
    return name.trim().toLocaleLowerCase() === "Dashboard".toLocaleLowerCase()
  }
  const getBreadcrumb = () => {
    // only show routes with meta.title
    let matched: any = route.matched.filter((item) => item.meta && item.meta.title)
    const first = matched[0]

    if (!isDashboard(first)) {
      matched = [{ path: "/dashboard", meta: { title: "Dashboard" } }].concat(matched)
    }

    levelList.value = matched.filter(
      (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
    )
  }

  const pathCompile = (path) => {
    // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
    const { params } = route
    const toPath: any = compile(path)
    return toPath(params)
  }

  const handleLink = (item) => {
    const { redirect, path } = item
    if (redirect) {
      router.push(redirect)
      return
    }
    router.push(pathCompile(path))
  }
  watch(
    () => route,
    (route) => {
      if (route.path.startsWith("/redirect/")) {
        return
      }
      getBreadcrumb()
    },
    {
      deep: true
    }
  )
  onBeforeMount(() => {
    getBreadcrumb()
  })
</script>

<style lang="scss" scoped>
  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 8px;

    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
</style>

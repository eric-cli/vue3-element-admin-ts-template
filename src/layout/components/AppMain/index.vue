<template>
  <router-view v-slot="{ Component }">
    <template v-if="Component">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="cachedViews">
          <Suspense>
            <section class="app-main">
              <component :is="Component" :key="key"></component>
            </section>
            <template #fallback>
              <div>Loading...</div>
            </template>
          </Suspense>
        </keep-alive>
      </transition>
    </template>
  </router-view>
</template>

<script setup lang="ts">
import useTagsViewStore from "@/stores/tagsView";
const tagsViewStore = useTagsViewStore();
const route = useRoute();
const cachedViews = computed(() => {
  return tagsViewStore.cachedViews;
});
const key = computed(() => {
  return route.path;
});
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header + .app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header + .app-main {
    padding-top: 84px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>

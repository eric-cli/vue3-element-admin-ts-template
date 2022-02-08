import { defineStore } from "pinia";

const useAppStore = defineStore({
  id: "app", // id必填，且需要唯一
  state: () => {
    return {
      sidebar: {
        opened: true,
        withoutAnimation: false,
      },
      device: "desktop",
      size: "medium",
    };
  },
  getters: {
    opened: (state) => {
      return state.sidebar.opened;
    },
  },
  actions: {
    toggleSideBar() {
      this.sidebar.opened = !this.sidebar.opened;
      this.sidebar.withoutAnimation = false;
    },
    closeSideBar(withoutAnimation: boolean) {
      this.sidebar.opened = false;
      this.sidebar.withoutAnimation = withoutAnimation;
    },
  },
  // 开启数据缓存
  persist: {
    enabled: true,
    strategies: [
      {
        paths: ["opened", "size"],
        storage: localStorage,
      },
    ],
  },
});

export default useAppStore;
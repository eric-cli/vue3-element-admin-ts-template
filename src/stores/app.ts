import { defineStore } from "pinia"

const logs: any[] = []

const useAppStore = defineStore({
  id: "app", // id必填，且需要唯一
  state: () => {
    return {
      sidebar: {
        opened: true,
        withoutAnimation: false
      },
      device: "desktop",
      size: "small",
      language: "en",
      logs
    }
  },
  getters: {
    opened: (state) => {
      return state.sidebar.opened
    }
  },
  actions: {
    setSize(size: any) {
      this.size = size
    },
    setLanguage(language: string) {
      console.log(language)
      this.language = language
    },
    toggleSideBar() {
      this.sidebar.opened = !this.sidebar.opened
      this.sidebar.withoutAnimation = false
    },
    closeSideBar(withoutAnimation: boolean) {
      this.sidebar.opened = false
      this.sidebar.withoutAnimation = withoutAnimation
    },
    addErrorLog(log: any) {
      this.logs.push(log)
    },
    clearErrorLog() {
      this.logs.splice(0) // splice 方法向/从数组添加/删除项目，并返回删除的项目。 如果第二个参数设置为 0，则不会删除任何项目。第一个设置为0，从0开始删除
    }
  },
  // 开启数据缓存
  persist: {
    enabled: true,
    strategies: [
      {
        paths: ["sidebar", "size", "language"],
        storage: localStorage
      }
    ]
  }
})

export default useAppStore

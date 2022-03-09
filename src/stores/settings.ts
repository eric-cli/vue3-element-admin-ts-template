import { defineStore } from "pinia"
import settings from "@/settings"
// import variables from "@/styles/element/element-variables.scss"
// console.log(variables)

const useSettingStore = defineStore({
  id: "settings",
  state: () => {
    return {
      // TODO: 用别的方式实现主题切换
      theme: "#1890ff",
      showSettings: settings.showSettings,
      tagsView: settings.tagsView,
      fixedHeader: settings.fixedHeader,
      sidebarLogo: settings.sidebarLogo
    }
  },
  actions: {
    changeSetting(settingsObj: { key: string | number; value: any }) {
      // eslint-disable-next-line no-prototype-builtins
      if (this.hasOwnProperty(settingsObj.key)) {
        this[settingsObj.key] = settingsObj.value
      }
    }
  }
})

export default useSettingStore

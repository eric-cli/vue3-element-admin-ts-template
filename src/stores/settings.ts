import { defineStore } from "pinia";
import settings from "@/settings";
const useSettingStore = defineStore({
  id: "settings",
  state: () => {
    return {
      // theme: variables.theme,
      showSettings: settings.showSettings,
      tagsView: settings.tagsView,
      fixedHeader: settings.fixedHeader,
      sidebarLogo: settings.sidebarLogo,
    };
  },
  actions: {
    changeSetting({ key, value }) {
      // eslint-disable-next-line no-prototype-builtins
      if (this.hasOwnProperty(key)) {
        this[key] = value;
      }
    },
  },
});

export default useSettingStore;

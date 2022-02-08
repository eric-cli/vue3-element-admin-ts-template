import { defineStore } from "pinia";

const useTagsViewStore = defineStore({
  id: "tagsView", // id必填，且需要唯一
  state: () => {
    return {
      visitedViews: [],
      cachedViews: [],
    };
  },
  actions: {},
});

export default useTagsViewStore;

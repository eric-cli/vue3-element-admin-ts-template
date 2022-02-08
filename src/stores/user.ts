import { defineStore } from "pinia";

const useUserStore = defineStore({
  id: "user",
  state: () => {
    return {
      roles: ["admin"],
    };
  },
});

export default useUserStore;

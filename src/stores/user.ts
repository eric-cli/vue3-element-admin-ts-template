import { defineStore } from "pinia";
import { login } from "@/apis/user";

const useUserStore = defineStore({
  id: "user",
  state: () => {
    return {
      token: "",
      userInfos: {},
      roles: [],
    };
  },
  getters: {
    avatar: (state) => {
      return state.userInfos.avatar;
    },
  },
  actions: {
    // user login
    login(userInfo: { username: any; password: any }) {
      const { username, password } = userInfo;
      return new Promise((resolve, reject) => {
        login({ username: username.trim(), password: password })
          .then(({ data, data: { role_name: roles, token } }) => {
            this.userInfos = data;
            this.roles = roles;
            this.token = token;
            resolve(data);
          })
          .catch((error: any) => {
            reject(error);
          });
      });
    },
    logout() {
      return new Promise((resolve) => {
        this.userInfos = {};
        this.roles = [];
        this.token = "";
        resolve();
      });
    },
  },
  // 开启数据缓存
  persist: {
    enabled: true,
  },
});

export default useUserStore;

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
        this.$reset();
        resolve();
      });
    },
    // dynamically modify permissions
    async changeRoles(role) {
      const token = role + "-token";

      // commit("SET_TOKEN", token);

      // TODO: 路由修改
      // setToken(token);

      // const { roles } = await dispatch("getInfo");

      // resetRouter();

      // generate accessible routes map based on roles
      // const accessRoutes = await dispatch("permission/generateRoutes", roles, {
      // root: true,
      // });
      // dynamically add accessible routes
      // router.addRoutes(accessRoutes);

      // reset visited views and cached views
      // dispatch("tagsView/delAllViews", null, { root: true });
    },
  },
  // 开启数据缓存
  persist: {
    enabled: true,
    strategies: [
      {
        paths: ["token", "userInfos", "roles"],
        storage: localStorage,
      },
    ],
  },
});

export default useUserStore;

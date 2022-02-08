import { defineStore } from "pinia";

const useUserStore = defineStore({
  id: "user",
  state: () => {
    return {
      roles: ["admin"],
    };
  },
  actions: {
    // user login
    login(userInfo) {
      const { username, password } = userInfo;
      return new Promise((resolve, reject) => {
        login({ username: username.trim(), password: password })
          .then((response) => {
            const { data } = response;
            // commit("SET_TOKEN", data.token);
            // setToken(data.token);
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
});

export default useUserStore;

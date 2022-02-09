import { defineStore } from "pinia";
import { login } from "@/apis/user";

const useUserStore = defineStore({
  id: "user",
  state: () => {
    return {
      roles: ["admin"],
    };
  },
  actions: {
    // user login
    login(userInfo: { username: any; password: any }) {
      const { username, password } = userInfo;

      return new Promise((resolve, reject) => {
        login({ username: username.trim(), password: password })
          .then((response) => {
            console.log(response);

            // commit("SET_TOKEN", data.token);
            // setToken(data.token);
            resolve();
          })
          .catch((error: any) => {
            reject(error);
          });
      });
    },
  },
});

export default useUserStore;

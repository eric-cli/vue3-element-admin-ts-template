import { defineStore } from "pinia";
import { constantRoutes, asyncRoutes } from "@/router";

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(
  roles: any[],
  route: { meta: { roles: string | any[] } }
) {
  if (route.meta && route.meta.roles) {
    return roles.some((role: any) => route.meta.roles.includes(role));
  } else {
    return true;
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes: any[], roles: any) {
  const res: any[] = [];

  routes.forEach((route: any) => {
    const tmp = { ...route };
    if (hasPermission(roles, tmp)) {
      if (tmp.children && tmp.children.length) {
        tmp.children = filterAsyncRoutes(tmp.children, roles);
      } else {
        tmp.children = [];
      }
      res.push(tmp);
    }
  });

  return res;
}

const usePermissionStore = defineStore({
  id: "permission", // id必填，且需要唯一
  state: () => {
    return {
      routes: [],
      addRoutes: [],
    };
  },
  actions: {
    generateRoutes(roles: string | string[]) {
      return new Promise((resolve) => {
        let accessedRoutes;

        if (roles.includes("admin")) {
          accessedRoutes = asyncRoutes || [];
        } else {
          accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
        }
        this.setRoutes(accessedRoutes);
        console.log(accessedRoutes);

        resolve(accessedRoutes);
      });
    },
    setRoutes(routes: any) {
      this.addRoutes = routes;
      this.routes = constantRoutes.concat(routes);
    },
  },
});

export default usePermissionStore;

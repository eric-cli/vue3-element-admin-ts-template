import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

/* Layout */
import Layout from "@/layout/index.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/redirect",
    component: Layout,
    // hidden: true,
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/Redirect/index.vue"),
      },
    ],
  },
  // {
  //   path: "/",
  //   name: "Home",
  //   component: () => import("@/views/Home/index.vue"), // 懒加载组件
  // },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/Dashboard/index.vue"),
        name: "Dashboard",
        meta: { title: "Dashboard", icon: "dashboard", affix: true },
      },
    ],
  },
  // {
  //   path: "/vuex",
  //   name: "Vuex",
  //   component: Vuex,
  // },
  // {
  //   path: "/axios",
  //   name: "Axios",
  //   component: () => import("@/views/axios.vue"), // 懒加载组件
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

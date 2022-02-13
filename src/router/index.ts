import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

/* Layout */
import Layout from "@/layout/index.vue";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes: Array<RouteRecordRaw> = [
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
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login/index.vue"),
    // hidden: true,
  },
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
  {
    path: "/documentation",
    component: Layout,
    redirect: "/documentation/index",
    children: [
      {
        path: "index",
        component: () => import("@/views/Documentation/index.vue"),
        name: "Documentation",
        meta: { title: "Documentation", icon: "documentation", affix: true },
      },
    ],
  },
  {
    path: "/guide",
    component: Layout,
    redirect: "/guide/index",
    children: [
      {
        path: "index",
        component: () => import("@/views/Guide/index.vue"),
        name: "Guide",
        meta: { title: "Guide", icon: "guide", noCache: true },
      },
    ],
  },
  {
    path: "/profile",
    component: Layout,
    redirect: "/profile/index",
    // hidden: true, TODO： 路由类型拓展
    children: [
      {
        path: "index",
        component: () => import("@/views/Profile/index.vue"),
        name: "Profile",
        meta: { title: "Profile", icon: "user", noCache: true },
      },
    ],
  },
];

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */

export const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path: "/icon",
    component: Layout,
    children: [
      {
        path: "index",
        component: () => import("@/views/Icons/index.vue"),
        name: "Icons",
        meta: { title: "Icons", icon: "icon", noCache: true },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,
});

export default router;

import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

/* Layout */
import Layout from "@/layout/index.vue";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
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
    hidden: true                   if set true, item will not show in the sidebar(default is false)
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
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/Redirect/index.vue"),
      },
    ],
    meta: { hidden: true },
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
    meta: { hidden: true },
  },
  {
    path: "/auth-redirect",
    component: () => import("@/views/login/auth-redirect.vue"),
    meta: { hidden: true },
  },
  {
    path: "/404",
    component: () => import("@/views/ErrorPages/404.vue"),
    meta: { hidden: true },
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
    // redirect: "/documentation/index",
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
    meta: { hidden: true },
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
    redirect: "/icon/index",
    meta: { title: "Icons", icon: "icon" },
    children: [
      {
        path: "index",
        name: "Icons",
        meta: { title: "Icons", icon: "icon", noCache: true },
        component: () =>
          import(/* webpackChunkName: "icon" */ "@/views/Icons/index.vue"),
      },
    ],
  },
  {
    path: "/error",
    component: Layout,
    redirect: "noRedirect",
    name: "ErrorPages",
    meta: {
      title: "Error Pages",
      icon: "404",
    },
    children: [
      {
        path: "401",
        component: () => import("@/views/ErrorPages/401.vue"),
        name: "Page401",
        meta: { title: "401", noCache: true },
      },
      {
        path: "404",
        component: () => import("@/views/ErrorPages/404.vue"),
        name: "Page404",
        meta: { title: "404", noCache: true },
      },
    ],
  },
  {
    path: "/error-log",
    component: Layout,
    children: [
      {
        path: "log",
        component: () => import("@/views/ErrorLog/index.vue"),
        name: "ErrorLog",
        meta: { title: "Error Log", icon: "bug" },
      },
    ],
  },
  {
    path: "/excel",
    component: Layout,
    redirect: "/excel/export-excel",
    name: "Excel",
    meta: {
      title: "Excel",
      icon: "excel",
    },
    children: [
      {
        path: "export-excel",
        component: () => import("@/views/Excel/ExportExcel.vue"),
        name: "ExportExcel",
        meta: { title: "Export Excel" },
      },
      {
        path: "export-selected-excel",
        component: () => import("@/views/Excel/SelectExcel.vue"),
        name: "SelectExcel",
        meta: { title: "Export Selected" },
      },
      {
        path: "export-merge-header",
        component: () => import("@/views/Excel/MergeHeader.vue"),
        name: "MergeHeader",
        meta: { title: "Merge Header" },
      },
      {
        path: "upload-excel",
        component: () => import("@/views/Excel/UploadExcel.vue"),
        name: "UploadExcel",
        meta: { title: "Upload Excel" },
      },
    ],
  },
  {
    path: "/zip",
    component: Layout,
    redirect: "/zip/download",
    // alwaysShow: true,
    name: "Zip",
    meta: { title: "Zip", icon: "zip", alwaysShow: true },
    children: [
      {
        path: "download",
        component: () => import("@/views/Zip/index.vue"),
        name: "ExportZip",
        meta: { title: "Export Zip" },
      },
    ],
  },
  {
    path: "/pdf",
    component: Layout,
    meta: { title: "PDF", icon: "pdf" },
    children: [
      {
        path: "index",
        component: () => import("@/views/Pdf/index.vue"),
        name: "PDF",
        meta: { title: "PDF", icon: "pdf" },
      },
    ],
  },
  {
    path: "/pdf/download",
    component: () => import("@/views/Pdf/download.vue"),
    name: "PdfDownload",
    meta: { title: "PdfDownload", icon: "pdf", hidden: true },
  },

  {
    path: "/theme",
    component: Layout,
    children: [
      {
        path: "index",
        component: () => import("@/views/Theme/index.vue"),
        name: "Theme",
        meta: { title: "Theme", icon: "theme" },
      },
    ],
  },
  {
    path: "/clipboard",
    component: Layout,
    children: [
      {
        path: "index",
        component: () => import("@/views/Clipboard/index.vue"),
        name: "ClipboardDemo",
        meta: { title: "Clipboard", icon: "clipboard" },
      },
    ],
  },
  {
    path: "/external-link",
    component: Layout,
    children: [
      {
        redirect: "/",
        path: "https://github.com/PanJiaChen/vue-element-admin",
        meta: { title: "External Link", icon: "link" },
      },
    ],
  },
  // 将匹配所有内容并将其放在 `$route.params.pathMatch` 下,  // 404 page must be placed at the end !!!
  { path: "/:pathMatch(.*)*", redirect: "/404", meta: { hidden: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,
});

export default router;

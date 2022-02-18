import router from "./router";
import useUserStore from "@/stores/user";
import usePermissionStore from "@/stores/permission";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { RouteRecordRaw } from "vue-router";

// import { getToken } from "@/utils/auth"; // get token from cookie

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ["/login", "/auth-redirect"]; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  console.log(to);

  // start progress bar
  NProgress.start();
  // set page title
  useTitle(to.meta.title);

  // determine whether the user has logged in
  const userStore = useUserStore();
  const permissionStore = usePermissionStore();
  if (userStore.token) {
    if (to.path === "/login") {
      // if is logged in, redirect to the home page
      next({ path: "/" });
      NProgress.done(); // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      const hasRoutes =
        permissionStore.addRoutes && permissionStore.addRoutes.length > 0;

      if (hasRoutes) {
        next();
      } else {
        try {
          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']

          const { roles } = userStore;
          // generate accessible routes map based on roles
          const accessRoutes: Array<RouteRecordRaw> = await permissionStore.generateRoutes(
            roles
          );
          // dynamically add accessible routes
          accessRoutes.forEach((item) => {
            console.log(item);

            router.addRoute(item);
          });
          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true });
        } catch (error) {
          console.log(error);

          // remove token and go to login page to re-login
          await userStore.logout();
          ElMessage.error(error || "Has Error");
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next();
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});
router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});

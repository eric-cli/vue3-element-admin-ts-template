import router from "./router";
import stores from "./stores";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style

// import { getToken } from "@/utils/auth"; // get token from cookie

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ["/login", "/auth-redirect"]; // no redirect whitelist

router.beforeEach((to, from, next) => {
  // start progress bar
  NProgress.start();
  // set page title
  useTitle(to.meta.title);
  const hasToken = useStorage("user", {});
  console.log(hasToken.value.token);
  if (hasToken.value.token) {
  }
});
router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});

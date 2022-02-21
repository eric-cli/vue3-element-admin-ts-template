// typings.d.ts or router.ts
import "vue-router";

declare module "vue-router" {
  // * alwaysShow: true               if set true, will always show the root menu
  // hidden: true                   if set true, item will not show in the sidebar(default is false)
  interface RouteMeta {
    // 是可选的
    hidden?: boolean;
    alwaysShow?: boolean;
  }
}

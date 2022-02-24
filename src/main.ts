import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./stores";
import "normalize.css/normalize.css";
import "virtual:windi.css";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "./permission";

import { setupGlobDirectives } from "./directives";
// import "virtual:windi.css";
import SvgIcon from "@/components/SvgIcon/index.vue";
import errorLogs from "./utils/error-log";

const app = createApp(App);
// Register global directive
setupGlobDirectives(app);

errorLogs(app);
// 注册icons组件
// 引入icons组件
app.component("svg-icon", SvgIcon); // svg component

app.use(router);
app.use(store);
app.use(ElementPlus, { zIndex: 3000 });
app.mount("#app");

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./stores";
import ElementPlus from "element-plus";
import "normalize.css/normalize.css";
import SvgIcon from "@/components/SvgIcon/index.vue";
import "element-plus/dist/index.css";
import errorLogs from "./utils/error-log";
const app = createApp(App);
errorLogs(app);
// 注册icons组件
// 引入icons组件
app.component("svg-icon", SvgIcon); // svg component

app.use(router);
app.use(store);
app.use(ElementPlus, { zIndex: 3000 });
app.mount("#app");

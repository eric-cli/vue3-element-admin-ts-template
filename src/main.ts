import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./stores";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
// import "./permission";
import "normalize.css/normalize.css";
import "virtual:windi.css";
import SvgIcon from "@/components/SvgIcon/index.vue";
import errorLogs from "./utils/error-log";
import { Close } from "@element-plus/icons-vue"; // svg图标

const app = createApp(App);
errorLogs(app);
// 注册icons组件
// 引入icons组件
app.component("svg-icon", SvgIcon); // svg component
app.component("Close", Close); // Edit component

app.use(router);
app.use(store);
app.use(ElementPlus, { zIndex: 3000 });
app.mount("#app");

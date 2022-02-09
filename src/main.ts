import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./stores";
import ElementPlus from "element-plus";
import "normalize.css/normalize.css";
import SvgIcon from "@/components/SvgIcon/index.vue";
import { setupProdMockServer } from "../mock/_createProductionServer";
console.log(import.meta.env);

if (import.meta.env.DEV) {
  setupProdMockServer();
}
import "element-plus/dist/index.css";
const app = createApp(App);
// 注册icons组件
// 引入icons组件
app.component("svg-icon", SvgIcon); // svg component

app.use(router);
app.use(store);
app.use(ElementPlus, { size: "small", zIndex: 3000 });
app.mount("#app");

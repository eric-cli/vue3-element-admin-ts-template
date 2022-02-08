import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import "normalize.css";

import "element-plus/dist/index.css";
const store = createPinia();
const app = createApp(App);
app.use(router);
app.use(store);
app.use(ElementPlus, { size: "small", zIndex: 3000 });
app.mount("#app");

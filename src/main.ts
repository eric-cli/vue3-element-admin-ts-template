import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/";
import { createPinia } from "pinia";
const store = createPinia();
const app = createApp(App);
app.use(router);
app.use(store);

app.mount("#app");

import { createApp } from "vue"
import ElementPlus from "element-plus"
import * as ElIcons from "@element-plus/icons-vue"

import App from "./App.vue"
import router from "./router"
import store from "./stores"
import "virtual:windi.css"
import "normalize.css/normalize.css"

// import ElementLocale from "element-plus/lib/locale"
import i18n from "./lang/i18n"
// console.log(ElementLocale)

// ElementLocale.i18n((key, value) => i18n.global.t(key, value))

import "element-plus/dist/index.css"

import "./permission"

import { setupGlobDirectives } from "./directives"
// import "virtual:windi.css";
import SvgIcon from "@/components/SvgIcon/index.vue"
import errorLogs from "./utils/error-log"

const app = createApp(App)
// Register global directive
setupGlobDirectives(app)

errorLogs(app)
// 注册icons组件
// 引入icons组件
app.component("SvgIcon", SvgIcon) // svg component

Object.keys(ElIcons).forEach((key) => {
  app.component(key, (ElIcons as any)[key])
})

app.use(router)
app.use(i18n)
app.use(store)
app.use(ElementPlus, { zIndex: 3000 })
app.mount("#app")

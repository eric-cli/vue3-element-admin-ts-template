// errorHandler
import Vue from "vue"
import useAppStore from "@/stores/app"
import { isArray } from "@/utils/validate"
import settings from "@/settings"

// you can set in settings.js
// errorLog:'production' | ['production', 'development']
const { errorLog: needErrorLog } = settings

const errorHandler = (app: Vue.App<Element>) => {
  const checkNeed = () => {
    const env = import.meta.env.MODE
    console.log(env)
    if (isArray(needErrorLog)) {
      return needErrorLog.includes(env)
    }
    return false
  }
  if (checkNeed()) {
    app.config.errorHandler = (err: any, vm: any, info: any) => {
      // 处理错误
      // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
      // Don't ask me why I use Vue.nextTick, it just a hack.
      // detail see https://forum.vuejs.org/t/dispatch-in-vue-config-errorhandler-has-some-problem/23500
      nextTick(() => {
        const appStore = useAppStore()
        appStore.addErrorLog({
          err,
          vm,
          info,
          url: window.location.href
        })
        console.error(err, info)
      })
    }
  }
}

export default errorHandler

import { createI18n } from "vue-i18n"
// import { createI18n } from "vue-i18n/dist/vue-i18n.esm-bundler.js" // 包括运行时编译器。如果您正在使用绑定器，但仍希望编译语言环境消息（例如，通过内联JavaScript字符串的模板），请使用此选项, 如果不需要的话使用上面即可

import messages from "./config"

const language = navigator.language.toLowerCase()
const i18n = createI18n({
  fallbackLocale: "en",
  globalInjection: true, // 注意上方标红代码，如果不设置为true挂载到全局的话， {{$t(`message.name`)}}这种使用会报错
  legacy: false, // you must specify 'legacy: false' option
  locale: localStorage.getItem("lang") || language.split("-")[0] || "en",
  messages
})

export default i18n

export function getLanguage() {
  // const chooseLanguage = Cookies.get("language")
  const chooseLanguage = ""
  if (chooseLanguage) return chooseLanguage

  // if has not choose language
  const language = (navigator.language || navigator.browserLanguage).toLowerCase()
  const locales = Object.keys(messages)
  locales.find((locale) => {
    return language.indexOf(locale) > -1
  })
  return "en"
}

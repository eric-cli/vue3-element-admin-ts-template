/**
 * Global authority directive
 * Used for clipboard
 * @Example v-clipboard="text"
 */
import type { DirectiveBinding } from "vue"
import handleClipboard from "@/utils/clipboard"

export const setupClipboardDirective = (app) => {
  app.directive("Clipboard", {
    // 指令具有一组生命周期钩子：
    // 当指令第一次绑定到元素并且在挂载父组件之前调用
    mounted(el: HTMLElement, binding: DirectiveBinding) {
      console.log(binding)
      const cancel = () => {
        console.log("mounted")

        if (!binding.value) {
          ElMessage.warn("没有需要复制的目标内容")
          return
        }
        handleClipboard(binding.value)
      }
      el.addEventListener("click", cancel)
    },
    // updated(el, binding) {
    // TODO // 添加绑定表单情况下，binding.value 情况处理
    //   // 实时更新最新的目标内容
    //   console.log(el, binding);
    //   if (binding.value !== binding.oldValue && binding.value) {
    //     el.removeEventListener("click", () => {
    //       console.log("清理了");
    //     });
    //     const cancel = () => {
    //       console.log("更新了");

    //       if (!binding.value) {
    //         ElMessage.warn("没有需要复制的目标内容");
    //         return;
    //       }
    //       handleClipboard(binding.value);
    //     };
    //     el.addEventListener("click", cancel);
    //   }
    // },
    // 在绑定元素的父组件卸载之后调用
    // unmounted(el: HTMLElement, binding: DirectiveBinding) {
    //   el.removeEventListener("click", () => {});
    //   console.log("卸载调用了");
    // },
    unmounted(el: HTMLElement) {
      el.removeEventListener("click", () => {})
      console.log("卸载调用了")
    }
  })
}

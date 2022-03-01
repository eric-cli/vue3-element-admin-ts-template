/**
 * Configure and register global directives
 */
import type { App } from "vue"
import { setupClipboardDirective } from "./clipboard"
import { setupWavesDirective } from "./waves"

// TODO 自动引入多个指令
export function setupGlobDirectives(app: App) {
  setupClipboardDirective(app)
  setupWavesDirective(app)
}

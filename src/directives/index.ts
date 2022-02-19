/**
 * Configure and register global directives
 */
import type { App } from "vue";
import { setupClipboardDirective } from "./clipboard";

export function setupGlobDirectives(app: App) {
  setupClipboardDirective(app);
}

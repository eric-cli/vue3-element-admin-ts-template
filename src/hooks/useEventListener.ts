import type { Ref } from "vue"

export type RemoveEventFn = () => void

export interface UseEventParams {
  el?: Element | Ref<Element | undefined> | Window | any
  name: string
  listener: EventListener
  options?: boolean | AddEventListenerOptions
  autoRemove?: boolean
  isDebounce?: boolean
  wait?: number
}

export function useEventListener({
  el = window,
  name,
  listener,
  options,
  autoRemove = true,
  isDebounce = true,
  wait = 80
}: UseEventParams): { removeEvent: RemoveEventFn } {
  let remove: RemoveEventFn = () => {}
  if (el) {
    const isAddRef = ref(false)
    const element = ref(el as Element) as Ref<Element>
    const handler = isDebounce ? useDebounceFn(listener, wait) : useThrottleFn(listener, wait)

    const realHandler = wait ? handler : listener
    const removeEventListener = (e: Element) => {
      isAddRef.value = true
      e.removeEventListener(name, realHandler, options)
    }
    const addEventListener = (e: Element) => {
      e.addEventListener(name, realHandler, options)
    }

    const removeWatch = watch(
      element,
      (newValue: Element, oldValue: Element, clearUp: any) => {
        if (newValue) {
          !unref(isAddRef) && addEventListener(newValue)
          clearUp(() => {
            autoRemove && removeEventListener(newValue)
          })
        }
      },
      {
        immediate: true
      }
    )

    remove = () => {
      removeEventListener(element.value)
      removeWatch()
    }
  }
  return { removeEvent: remove }
}

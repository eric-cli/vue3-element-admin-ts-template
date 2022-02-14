import { isFunction } from "@/utils/validate";

export function useTimeouRef(wait: number) {
  const readyRef = ref(false);

  let timer: TimeoutHandle;

  const stop = (): void => {
    readyRef.value = false;
    timer && window.clearTimeout(timer);
  };

  const start = (): void => {
    stop();
    timer = setTimeout(() => {
      readyRef.value = true;
    }, wait);
  };

  start();

  tryOnUnmounted(stop);

  return { readyRef, stop, start };
}

export function useTimeoutFn(handle: Fn, wait: number, native = false) {
  if (!isFunction(handle)) {
    throw new Error("handle is not a function");
  }

  const { readyRef, stop, start } = useTimeouRef(wait);

  if (native) {
    handle();
  } else {
    watch(
      readyRef,
      (maturity) => {
        maturity && handle();
      },
      {
        immediate: false,
      }
    );
  }
  return { readyRef, stop, start };
}

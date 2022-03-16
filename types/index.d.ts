declare interface Fn<T = any, R = T> {
  (...arg: T[]): R
}

declare interface DropDownMenuItem {
  href: string
  title: string
}

declare type StatusFilterType = "" | "info" | "success" | "warning" | "danger"

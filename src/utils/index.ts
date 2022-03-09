/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat = "{y}-{m}-{d} {h}:{i}:{s}") {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat
  let date
  if (typeof time === "object") {
    date = time
  } else {
    if (typeof time === "string") {
      if (/^[0-9]+$/.test(time)) {
        // support "1548221490638"
        time = parseInt(time, 10)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(/\-/g, "/")
      }
    }

    if (typeof time === "number" && time.toString().length === 10) {
      time *= 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeStr = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === "a") {
      return ["日", "一", "二", "三", "四", "五", "六"][value]
    }
    return value.toString().padStart(2, "0")
  })
  return timeStr
}

/**
 * formate router icon
 * @param {string} eleV2String
 * @returns {string}
 */
export const formateElIcons = (str) => {
  return str.replace("el-icon-", "")
}

/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp(`(\\s|^)${cls}(\\s|$)`))
}

/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ` ${cls}`
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp(`(\\s|^)${cls}(\\s|$)`)
    ele.className = ele.className.replace(reg, " ")
  }
}

/**
 * @param {HTMLElement} element
 * @param {string} className
 */
export function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += `${className}`
  } else {
    classString =
      classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path: string) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str: string) {
  const validMap = ["admin", "editor"];
  return validMap.indexOf(str.trim()) >= 0;
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isString(str: any) {
  if (typeof str === "string" || str instanceof String) {
    return true;
  }
  return false;
}

/**
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray(arg: any) {
  if (typeof Array.isArray === "undefined") {
    return Object.prototype.toString.call(arg) === "[object Array]";
  }
  return Array.isArray(arg);
}

/**
 * @param {unknown} arg
 * @returns {Boolean}
 */
export function isFunction(val: unknown): val is Function {
  return typeof val === "function";
}

/**
 * @param {file} any
 * @returns {Boolean}
 */
export function isExcel(file: any) {
  return /\.(xlsx|xls|csv)$/.test(file.name);
}

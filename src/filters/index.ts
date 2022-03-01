/**
 * Upper case first char
 * @param {String} string
 */
export function uppercaseFirst(roles: string[]) {
  let role = "admin"
  if (!roles.includes("admin")) {
    role = "editor"
  }
  return role.charAt(0).toUpperCase() + role.slice(1)
}

/**
 * 10000 => "10,000"
 * @param {number} num
 */
export function toThousandFilter(num: string | number) {
  return (+num || 0).toString().replace(/^-?\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ","))
}

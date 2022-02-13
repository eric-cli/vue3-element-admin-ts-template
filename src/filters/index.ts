/**
 * Upper case first char
 * @param {String} string
 */
export function uppercaseFirst(roles: string[]) {
  let role = "admin";
  if (!roles.includes("admin")) {
    role = "editor";
  }
  return role.charAt(0).toUpperCase() + role.slice(1);
}

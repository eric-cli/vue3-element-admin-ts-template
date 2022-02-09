import request from "@/utils/request";

export function login(data: any) {
  return request({
    url: "/vue-element-admin/user/login",
    method: "post",
    data,
  });
}

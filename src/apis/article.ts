import request from "@/utils/request";

export function fetchList(query) {
  return request({
    url: "/api/article/list",
    method: "get",
    params: query,
  });
}

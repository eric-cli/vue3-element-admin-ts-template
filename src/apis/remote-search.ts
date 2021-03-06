import request from "@/utils/request"

export function transactionList(query: any = {}) {
  return request({
    url: "/api/transaction/list",
    method: "get",
    params: query
  })
}

export function searchUser(name) {
  return request({
    url: "/api/search/user",
    method: "get",
    params: { name }
  })
}

import Mock, { Random } from "mockjs";
// 拓展mockjs
Mock.Random.extend({
  phone() {
    let phonePrefixs = ["188", "158", "138"]; // 自己写前缀哈
    return this.pick(phonePrefixs) + Mock.mock(/\d{8}/); //Number()
  },
});

const user = Mock.mock({
  id: "@id",
  description: "@cparagraph(10, 20)",
  account: "@phone",
  email: "@email",
  true_name: "@cname",
  created_at: "@datetime",
  "role_name|1": [["admin"], ["editor"], ["admin", "editor"]],
  avatar: Random.image("200x200", "#4A7BF7", "Eric Lee"),
  token: "@guid",
});

const data = Mock.mock({
  "items|30": [
    {
      id: "@id",
      title: "@sentence(10, 20)",
      account: "@phone",
      true_name: "@name",
      created_at: "@datetime",
      role_name: "@name",
      avatar: Random.image("200x100", "#4A7BF7", "Hello"),
    },
  ],
});

export default [
  {
    url: "/api/user/login",
    method: "post",
    response: () => {
      return {
        code: 1,
        message: "请求成功",
        data: user,
      };
    },
  },
];

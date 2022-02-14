import Mock, { Random } from "mockjs";

const NameList = Mock.mock({
  "items|100": [
    {
      id: "@id",
      name: "@first",
    },
  ],
});
const TransactionList = Mock.mock({
  "lists|20": [
    {
      order_no: "@guid()",
      timestamp: +Random.date("T"),
      username: "@name()",
      price: "@float(1000, 15000, 0, 2)",
      "status|1": ["success", "pending"],
    },
  ],
});

export default [
  // username search
  {
    url: "/api/search/user",
    method: "get",
    response: (config: { query: { name: any } }) => {
      const { name } = config.query;
      const mockNameList = NameList.filter((item: { name: string }) => {
        const lowerCaseName = item.name.toLowerCase();
        return !(name && lowerCaseName.indexOf(name.toLowerCase()) < 0);
      });
      return {
        code: 1,
        message: "请求成功",
        data: mockNameList,
      };
    },
  },

  // transaction list
  {
    url: "/api/transaction/list",
    method: "get",
    response: () => {
      return {
        code: 1,
        message: "请求成功",
        data: {
          total: 20,
          lists: TransactionList.lists,
        },
      };
    },
  },
];

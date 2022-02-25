import Layout from "@/layout/index.vue";

const tableRouter = {
  path: "/table",
  component: Layout,
  redirect: "/table/complex-table",
  name: "Table",
  meta: {
    title: "Table",
    icon: "table",
  },
  children: [
    {
      path: "dynamic-table",
      component: () => import("@/views/Table/dynamic-table/index.vue"),
      name: "DynamicTable",
      meta: { title: "Dynamic Table" },
    },
    {
      path: "drag-table",
      component: () => import("@/views/Table/drag-table.vue"),
      name: "DragTable",
      meta: { title: "Drag Table" },
    },
    {
      path: "inline-edit-table",
      component: () => import("@/views/Table/inline-edit-table.vue"),
      name: "InlineEditTable",
      meta: { title: "Inline Edit" },
    },
    {
      path: "complex-table",
      component: () => import("@/views/table/complex-table.vue"),
      name: "ComplexTable",
      meta: { title: "Complex Table" },
    },
  ],
};

export default tableRouter;

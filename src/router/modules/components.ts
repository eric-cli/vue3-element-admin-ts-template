/** When your routing table is too long, you can split it into small modules **/

import Layout from "@/layout/index.vue"

const componentsRouter = {
  path: "/components",
  component: Layout,
  redirect: "noRedirect",
  name: "ComponentDemo",
  meta: {
    title: "Components",
    icon: "component"
  },
  children: [
    {
      path: "tinymce",
      component: () => import("@/views/ComponentDemo/tinymce.vue"),
      name: "TinymceDemo",
      meta: { title: "Tinymce" }
    },
    {
      path: "markdown",
      component: () => import("@/views/ComponentDemo/markdown.vue"),
      name: "MarkdownDemo",
      meta: { title: "Markdown" }
    },
    {
      path: "json-editor",
      component: () => import("@/views/ComponentDemo/json-editor.vue"),
      name: "JsonEditorDemo",
      meta: { title: "JSON Editor" }
    },
    {
      path: "split-pane",
      component: () => import("@/views/ComponentDemo/split-pane.vue"),
      name: "SplitpaneDemo",
      meta: { title: "SplitPane" }
    },
    {
      path: "avatar-upload",
      component: () => import("@/views/ComponentDemo/avatar-upload.vue"),
      name: "AvatarUploadDemo",
      meta: { title: "Upload" }
    },
    {
      path: "dropzone",
      component: () => import("@/views/ComponentDemo/dropzone.vue"),
      name: "DropzoneDemo",
      meta: { title: "Dropzone" }
    },
    {
      path: "sticky",
      component: () => import("@/views/ComponentDemo/sticky.vue"),
      name: "StickyDemo",
      meta: { title: "Sticky" }
    },
    {
      path: "count-to",
      component: () => import("@/views/ComponentDemo/count-to.vue"),
      name: "CountToDemo",
      meta: { title: "Count To" }
    },
    {
      path: "mixin",
      component: () => import("@/views/ComponentDemo/mixin.vue"),
      name: "ComponentMixinDemo",
      meta: { title: "Component Mixin" }
    },
    {
      path: "back-to-top",
      component: () => import("@/views/ComponentDemo/back-to-top.vue"),
      name: "BackToTopDemo",
      meta: { title: "Back To Top" }
    },
    {
      path: "drag-dialog",
      component: () => import("@/views/ComponentDemo/drag-dialog.vue"),
      name: "DragDialogDemo",
      meta: { title: "Drag Dialog" }
    },
    {
      path: "drag-select",
      component: () => import("@/views/ComponentDemo/drag-select.vue"),
      name: "DragSelectDemo",
      meta: { title: "Drag Select" }
    },
    {
      path: "dnd-list",
      component: () => import("@/views/ComponentDemo/dnd-list.vue"),
      name: "DndListDemo",
      meta: { title: "Dnd List" }
    },
    {
      path: "drag-kanban",
      component: () => import("@/views/ComponentDemo/drag-kanban.vue"),
      name: "DragKanbanDemo",
      meta: { title: "Drag Kanban" }
    }
  ]
}

export default componentsRouter

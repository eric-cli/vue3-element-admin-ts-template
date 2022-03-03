<template>
  <li :class="{ completed: todo.done, editing: editing }" class="todo">
    <el-row class="view" align="middle" justify="space-between">
      <input :checked="todo.done" class="toggle" type="checkbox" @change="toggleTodo(todo)" />
      <label @dblclick="editing = true" v-text="todo.text" />
      <el-icon class="destroy" color="#af5b5e" @click="deleteTodo(todo)"><Close /></el-icon>
    </el-row>
    <input
      v-show="editing"
      v-focus="editing"
      :value="todo.text"
      class="edit"
      @keyup.enter="doneEdit"
      @keyup.esc="cancelEdit"
      @blur="doneEdit"
    />
  </li>
</template>

<script lang="ts" setup>
  import { Close } from "@element-plus/icons-vue"

  const vFocus = {
    beforeMount: (el, { value }, { context }) => {
      if (value) {
        context.$nextTick(() => {
          el.focus()
        })
      }
    }
  }
  const props = defineProps({
    todo: {
      type: Object,
      default() {
        return {}
      }
    }
  })
  const emit = defineEmits(["deleteTodo", "editTodo", "toggleTodo"])
  const editing = ref(false)
  const deleteTodo = (todo) => {
    emit("deleteTodo", todo)
  }
  const editTodo = ({ todo, value }) => {
    emit("editTodo", { todo, value })
  }
  const toggleTodo = (todo) => {
    emit("toggleTodo", todo)
  }
  const doneEdit = (e) => {
    const value = e.target.value.trim()
    const { todo } = props
    if (!value) {
      deleteTodo({
        todo
      })
    } else if (editing.value) {
      editTodo({
        todo,
        value
      })
      editing.value = false
    }
  }

  const cancelEdit = (e) => {
    e.target.value = props.todo.text
    editing.value = false
  }
</script>

<style lang="scss" scoped>
  .todo {
    position: relative;
    font-size: 24px;
    border-bottom: 1px solid #ededed;
    &:last-child {
      border-bottom: none;
    }
    .edit {
      display: none;
    }
    .toggle {
      text-align: center;
      width: 40px;
      /* auto, since non-WebKit browsers doesn't support input styling */
      height: auto;
      position: absolute;
      top: 0;
      bottom: 0;
      margin: auto 0;
      border: none;
      appearance: none;
      opacity: 0;
      &:checked + label {
        background-size: 36px;
        background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E");
      }
      & + label {
        /*
    Firefox requires `#` to be escaped - https://bugzilla.mozilla.org/show_bug.cgi?id=922433
    IE and Edge requires *everything* to be escaped to render, so we do that instead of just the `#` - https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/7157459/
  */
        background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: center left;
        background-size: 36px;
      }
    }

    label {
      word-break: break-all;
      padding: 15px 15px 15px 50px;
      display: block;
      line-height: 1;
      font-size: 14px;
      transition: color 0.4s;
      font-weight: 700;
    }

    &.completed {
      label {
        color: #d9d9d9;
        text-decoration: line-through;
      }
    }
    .destroy {
      display: none;
      position: absolute;
      top: 50%;
      right: 10px;
      bottom: 0;
      width: 40px;
      height: 40px;
      margin: 0 auto;
      padding: 5px 0;
      font-size: 30px;
      color: #cc9a9a;
      transition: color 0.2s ease-out;
      cursor: pointer;
      text-align: center;
      box-sizing: border-box;
      transform: translate(0, -50%);

      &:hover {
        color: #af5b5e;
      }
    }

    &.editing {
      border-bottom: none;
      padding: 0;
      .edit {
        display: block;
        width: 506px;
        padding: 12px 16px;
        margin: 0 0 0 43px;
      }
      .view {
        display: none;
      }

      :last-child {
        margin-bottom: -1px;
      }
    }

    &:hover {
      .destroy {
        display: block;
      }
    }
  }

  /*
  Hack to remove background from Mobile Safari.
  Can't use it globally since it destroys checkboxes in Firefox
*/
  @media screen and (-webkit-min-device-pixel-ratio: 0) {
    li {
      .toggle {
        background: none;
        height: 40px;
      }
    }
  }
</style>

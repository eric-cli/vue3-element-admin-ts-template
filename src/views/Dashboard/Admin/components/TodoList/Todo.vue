<template>
  <li :class="{ completed: todo.done, editing: editing }" class="todo">
    <el-row class="view" align="middle" justify="space-between">
      <input
        :checked="todo.done"
        class="toggle"
        type="checkbox"
        @change="toggleTodo(todo)"
      />
      <label @dblclick="editing = true" v-text="todo.text" />
      <button class="destroy" @click="deleteTodo(todo)">X</button>
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
const vFocus = {
  beforeMount: (el, { value }, { context }) => {
    if (value) {
      context.$nextTick(() => {
        el.focus();
      });
    }
  },
};
const props = defineProps({
  todo: {
    type: Object,
    default: function () {
      return {};
    },
  },
});
const emit = defineEmits(["deleteTodo", "editTodo", "toggleTodo"]);
const editing = ref(false);
const deleteTodo = (todo) => {
  emit("deleteTodo", todo);
};
const editTodo = ({ todo, value }) => {
  emit("editTodo", { todo, value });
};
const toggleTodo = (todo) => {
  emit("toggleTodo", todo);
};
const doneEdit = (e) => {
  const value = e.target.value.trim();
  const { todo } = props;
  if (!value) {
    deleteTodo({
      todo,
    });
  } else if (editing.value) {
    editTodo({
      todo,
      value,
    });
    editing.value = false;
  }
};

const cancelEdit = (e) => {
  e.target.value = props.todo.text;
  editing.value = false;
};
</script>

<style lang="scss" scoped></style>

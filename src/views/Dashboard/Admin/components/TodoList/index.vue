<template>
  <section class="todoapp">
    <!-- header -->
    <header class="header">
      <input class="new-todo" autocomplete="off" placeholder="Todo List" @keyup.enter="addTodo" />
    </header>
    <!-- main section -->
    <section v-show="todos.length" class="main">
      <input
        id="toggle-all"
        :checked="allChecked"
        class="toggle-all"
        type="checkbox"
        @change="toggleAll({ done: !allChecked })"
      />
      <label for="toggle-all" />
      <ul class="todo-list">
        <todo
          v-for="(todo, index) in filteredTodos"
          :key="index"
          :todo="todo"
          @toggleTodo="toggleTodo"
          @editTodo="editTodo"
          @deleteTodo="deleteTodo"
        />
      </ul>
    </section>
    <!-- footer -->
    <footer v-show="todos.length" class="footer">
      <span class="todo-count">
        <strong>{{ remaining }}</strong>
        {{ pluralize(remaining, "item") }} left
      </span>
      <ul class="filters">
        <li v-for="(val, key) in filters" :key="key">
          <a :class="{ selected: visibility === key }" @click.prevent="visibility = key">{{
            capitalize(key)
          }}</a>
        </li>
      </ul>
      <button class="clear-completed" v-show="todos.length > remaining" @click="clearCompleted">
        Clear completed
      </button>
    </footer>
  </section>
</template>

<script lang="ts" setup>
  import Todo from "./Todo.vue"
  const STORAGE_KEY = "todos"
  const pluralize = (n, w) => (n === 1 ? w : w + "s")
  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1)
  let visibility = ref("all")
  let todos = ref([
    { text: "star this repository", done: false },
    { text: "fork this repository", done: false },
    { text: "follow author", done: false },
    { text: "vue-element-admin", done: true },
    { text: "vue", done: true },
    { text: "element-ui", done: true },
    { text: "axios", done: true },
    { text: "webpack", done: true }
  ])
  let filters = {
    all: (todos) => todos,
    active: (todos) => todos.filter((todo) => !todo.done),
    completed: (todos) => todos.filter((todo) => todo.done)
  }

  const allChecked = computed(() => {
    return todos.value.every((todo) => todo.done)
  })
  const filteredTodos = computed(() => {
    return filters[visibility.value](todos.value)
  })
  const remaining = computed(() => {
    return todos.value.filter((todo) => !todo.done).length
  })

  const setLocalStorage = () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos.value))
  }

  const addTodo = (e) => {
    const text = e.target.value
    if (text.trim()) {
      todos.value.push({
        text,
        done: false
      })
      setLocalStorage()
    }
    e.target.value = ""
  }
  const toggleTodo = (val) => {
    val.done = !val.done
    setLocalStorage()
  }
  const deleteTodo = (todo) => {
    todos.value.splice(todos.value.indexOf(todo), 1)
    setLocalStorage()
  }
  const editTodo = ({ todo, value }) => {
    todo.text = value
    setLocalStorage()
  }

  const clearCompleted = () => {
    todos.value = todos.value.filter((todo) => !todo.done)
    setLocalStorage()
  }

  const toggleAll = ({ done }) => {
    todos.value.forEach((todo) => {
      todo.done = done
      setLocalStorage()
    })
  }
</script>

<style lang="scss" scoped>
  // @import "./index.scss";

  .todoapp {
    font: 14px "Helvetica Neue", Helvetica, Arial, sans-serif;
    line-height: 1.4em;
    color: #4d4d4d;
    min-width: 230px;
    max-width: 550px;
    margin: 0 auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 300;
    background: #fff;
    z-index: 1;
    position: relative;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);

    .todo-list {
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .footer {
      color: #777;
      position: relative;
      padding: 10px 15px;
      height: 40px;
      text-align: center;
      border-top: 1px solid #e6e6e6;
      &:before {
        content: "";
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        height: 40px;
        overflow: hidden;
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6,
          0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6,
          0 17px 2px -6px rgba(0, 0, 0, 0.2);
      }

      .filters {
        margin: 0;
        padding: 0;
        position: relative;
        z-index: 1;
        list-style: none;

        li {
          display: inline;
          a {
            color: inherit;
            font-size: 12px;
            padding: 3px 7px;
            text-decoration: none;
            border: 1px solid transparent;
            border-radius: 3px;
            &:hover {
              border-color: rgba(175, 47, 47, 0.1);
            }
            &.selected {
              border-color: rgba(175, 47, 47, 0.2);
            }
          }
        }
      }

      .clear-completed {
        float: right;
        position: relative;
        line-height: 20px;
        text-decoration: none;
        cursor: pointer;

        &:active {
          float: right;
          position: relative;
          line-height: 20px;
          text-decoration: none;
          cursor: pointer;
        }
        &:hover {
          text-decoration: underline;
        }
      }

      .todo-count {
        float: left;
        text-align: left;
        strong {
          font-weight: 300;
        }
      }
    }

    .main {
      position: relative;
      z-index: 2;
      border-top: 1px solid #e6e6e6;
    }

    .toggle-all {
      text-align: center;
      border: none;
      /* Mobile Safari */
      opacity: 0;
      position: absolute;

      & + label {
        width: 60px;
        height: 34px;
        font-size: 0;
        position: absolute;
        top: -40px;
        left: -15px;
        transform: rotate(90deg);
        &:before {
          content: "❯";
          font-size: 22px;
          color: #e6e6e6;
          padding: 10px 17px 11px 18px;
        }
      }

      &:checked + label:before {
        color: #737373;
      }
    }

    .new-todo {
      position: relative;
      margin: 0;
      width: 100%;
      font-size: 18px;
      font-family: inherit;
      font-weight: inherit;
      line-height: 1.4em;
      color: inherit;
      box-sizing: border-box;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      padding: 16px 16px 16px 50px;
      border: none;
      background: rgba(0, 0, 0, 0.003);
      box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
    }

    button {
      margin: 0;
      padding: 0;
      border: 0;
      background: none;
      font-size: 100%;
      vertical-align: baseline;
      font-family: inherit;
      font-weight: inherit;
      color: inherit;
      -webkit-appearance: none;
      appearance: none;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    :focus {
      outline: 0;
    }

    .hidden {
      display: none;
    }

    input::placeholder {
      font-style: italic;
      font-weight: 300;
      color: #e6e6e6;
    }

    h1 {
      position: absolute;
      top: -155px;
      width: 100%;
      font-size: 100px;
      font-weight: 100;
      text-align: center;
      color: rgba(175, 47, 47, 0.15);
      text-rendering: optimizeLegibility;
    }
  }

  @media (max-width: 430px) {
    .footer {
      height: 50px;
    }
    .filters {
      bottom: 10px;
    }
  }
</style>

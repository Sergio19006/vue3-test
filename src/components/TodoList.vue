<template>
  <div class="todoapp">
    <h1>TODOS</h1>
    <div class="main">
      <input
        class="toggle-all"
        type="checkbox"
        id="cbox"
        :value="toogle"
        v-model="toogle"
      />
      <label for="cbox"></label>
    </div>

    <input
      placeholder="Insert new todo item"
      id="todoInput"
      ref="todoInput"
      type="text"
      class="new-todo edit"
      @keyup.enter="enterNewTodo"
      v-model="newItem"
    />

    <ul class="todo-list">
      <template v-for="todo in todoList" :key="todo.id">
        <ItemList :id="todo.id" />
      </template>
    </ul>
    <div class="footer">
      <strong class="todo-count">
        {{ todoList.filter((t) => !t.done).length }}
        {{ itemsLabel }} left</strong
      >
      <ul class="filters">
        <li>
          <router-link to="/" :class="!active && !completed ? 'selected' : ''"
            >all</router-link
          >
          <router-link to="/active" :class="active ? 'selected' : ''"
            >active</router-link
          >
          <router-link to="/completed" :class="completed ? 'selected' : ''"
            >Completed</router-link
          >
        </li>
        <button class="clear-completed" @click="clearCompleted">
          Clear Completed
        </button>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, mapActions } from "vuex";
import ItemList from "./ItemList.vue";
import pluralize from "pluralize";

export default defineComponent({
  name: "HelloWorld",

  components: { ItemList },

  data() {
    return {
      newItem: "",
      toogle: false,
      active: false,
      completed: false,
    };
  },

  mounted() {
    (this.$refs.todoInput as HTMLElement).focus();
  },

  updated() {
    this.active = window.location.pathname === "/active" ? true : false;
    this.completed = window.location.pathname === "/completed" ? true : false;
  },

  computed: {
    ...mapGetters(["getTodoList"]),

    todoList() {
      if (this.active) return this.getTodoList("active");

      if (this.completed) return this.getTodoList("completed");

      return this.getTodoList();
    },

    itemsLabel(): string {
      return pluralize("item", this.todoList.filter((t) => !t.done).length);
    },
  },

  watch: {
    toogle() {
      this.toogleAll(this.toogle);
    },
  },

  methods: {
    ...mapActions(["add", "toogleAll", "removeClompletedTodos"]),

    enterNewTodo() {
      if (!this.newItem) return;

      this.add(this.newItem);

      this.newItem = "";
    },

    clearCompleted() {
      this.removeClompletedTodos();
    },
  },
});
</script>

<style>
.todo-list li .todo-list li .toggle:checked + label {
  background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E");
}
:focus {
  outline: 0;
}
.todoapp {
  background: #fff;
  margin: 130px 0 40px 0;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
}

.todoapp input::-webkit-input-placeholder {
  font-style: italic;
  font-weight: 300;
  color: #e6e6e6;
}

.todoapp input::-moz-placeholder {
  font-style: italic;
  font-weight: 300;
  color: #e6e6e6;
}

.todoapp input::input-placeholder {
  font-style: italic;
  font-weight: 300;
  color: #e6e6e6;
}

.todoapp h1 {
  position: absolute;
  top: -155px;
  width: 100%;
  font-size: 100px;
  font-weight: 100;
  text-align: center;
  color: rgba(175, 47, 47, 0.15);
  -webkit-text-rendering: optimizeLegibility;
  -moz-text-rendering: optimizeLegibility;
  text-rendering: optimizeLegibility;
}
.new-todo,
.edit {
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: 0;
  color: inherit;
  padding: 6px;
  border: 1px solid #999;
  box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.new-todo {
  padding: 16px 16px 16px 60px;
  border: none;
  background: rgba(0, 0, 0, 0.003);
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
}

.main {
  position: relative;
  z-index: 2;
  border-top: 1px solid #e6e6e6;
}

.todo-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.hidden {
  display: none;
}

.todo-list li {
  display: flex;
  position: relative;
  font-size: 24px;
  border-bottom: 1px solid #ededed;
}

.todo-list li:last-child {
  border-bottom: none;
}

.toggle-all {
  text-align: center;
  border: none; /* Mobile Safari */
  opacity: 0;
  position: absolute;
}

.toggle-all + label {
  width: 60px;
  height: 34px;
  font-size: 0;
  position: absolute;
  top: -12px;
  left: -25px;
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
}

.toggle-all + label:before {
  content: "❯";
  font-size: 22px;
  color: #e6e6e6;
  padding: 10px 27px 10px 27px;
}

.toggle-all:checked + label:before {
  color: #737373;
}

.footer {
  color: #777;
  padding: 10px 15px;
  height: 20px;
  text-align: center;
  border-top: 1px solid #e6e6e6;
}

.footer:before {
  content: "";
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 50px;
  overflow: hidden;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6,
    0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6,
    0 17px 2px -6px rgba(0, 0, 0, 0.2);
}

.clear-completed,
html .clear-completed:active {
  float: right;
  position: relative;
  line-height: 20px;
  text-decoration: none;
  cursor: pointer;
  margin-right: 10px;
}

.clear-completed:hover {
  text-decoration: underline;
}

.todo-count {
  float: left;
  text-align: left;
}

.filters {
  margin: 0;
  padding: 0;
  list-style: none;
  position: absolute;
  right: 0;
  left: 0;
}

.filters li {
  display: inline;
  list-style: none;
}

.filters li a {
  color: inherit;
  margin: 3px;
  padding: 3px 7px;
  text-decoration: none;
  border: 1px solid transparent;
  border-radius: 3px;
}

.filters li a:hover {
  border-color: rgba(175, 47, 47, 0.1);
}

.filters li a.selected {
  border-color: rgba(175, 47, 47, 0.2);
}

.todo-count strong {
  font-weight: 300;
}

@media screen and (-webkit-min-device-pixel-ratio: 0) {
  .toggle-all,
  .todo-list li .toggle {
    background: none;
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

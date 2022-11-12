<template>
  <li
    :class="[classObjectLi]"
    @mouseover="isOverRemove()"
    @mouseout="isOverRemove()"
  >
    <input
      class="toggle"
      type="checkbox"
      :value="todo.done"
      v-model="todoDone"
    />

    <label
      :class="!todo.readonly ? 'hidden' : ''"
      @dblclick="editTodo()"
      :for="todo.id"
      >{{ todo.name }}</label
    >
    <input
      :id="todo.id"
      :class="[classObjectInput]"
      :readonly="todo.readonly"
      @keyup.enter="saveEditTodo($event)"
    />
    <button @click="removeItem" class="destroy" :style="overStyles"></button>
  </li>
</template>

<script lang="ts">
import todoItem from "@/interfaces/todoItem";
import { defineComponent } from "vue";
import { mapGetters, mapActions } from "vuex";

export default defineComponent({
  name: "ItemList",

  data() {
    return {
      isOver: false,
    };
  },

  props: {
    id: String,
  },

  computed: {
    ...mapGetters(["getTodoById"]),

    todo(): todoItem {
      return this.getTodoById(this.id);
    },

    todoDone: {
      get(): boolean {
        return this.getTodoById(this.id).done;
      },
      set() {
        this.done(this.todo.id);
      },
    },

    classObjectInput() {
      return {
        "new-todo": true,
        editing: !this.todo.readonly,
        edit: !this.todo.readonly,
        "text-danger": false,
        hidden: this.todo.readonly,
      };
    },
    classObjectLi() {
      return {
        completed: this.todo.done,
        editing: !this.todo.readonly,
      };
    },
    overStyles() {
      return {
        display: this.isOver ? "block" : "",
      };
    },
  },

  methods: {
    ...mapActions(["done", "edit", "remove"]),

    editTodo() {
      this.todo.readonly = false;
    },

    saveEditTodo(event: Event) {
      const newVal = (event.target as HTMLInputElement).value;
      if (!newVal) return;

      this.edit({ newVal, id: this.id });
    },

    removeItem() {
      this.remove(this.id);
    },

    isOverRemove() {
      this.isOver = !this.isOver;
    },
  },
});
</script>

<style scoped>
.editing {
  border-bottom: none;
  padding: 0;
}

.editing:last-child {
  margin-bottom: -1px;
}

.editing .edit {
  display: block;
  width: 506px;
  padding: 12px 16px;
  margin: 0 0 0 43px;
}
.todo-list li .toggle {
  text-align: center;
  width: 40px;
  /* auto, since non-WebKit browsers doesn't support input styling */
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  border: none; /* Mobile Safari */
  -webkit-appearance: none;
  appearance: none;
}

.todo-list li .toggle {
  opacity: 0;
}

.todo-list li .toggle + label {
  /*
		Firefox requires `#` to be escaped - https://bugzilla.mozilla.org/show_bug.cgi?id=922433
		IE and Edge requires *everything* to be escaped to render, so we do that instead of just the `#` - https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/7157459/
	*/
  background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center left;
}

.todo-list li .toggle:checked + label {
  background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E");
}

.todo-list li label {
  word-break: break-all;
  padding: 15px 15px 15px 60px;
  line-height: 1.2;
  transition: color 0.4s;
}

.todo-list li.completed label {
  color: #d9d9d9;
  text-decoration: line-through;
}

.new-todo {
  padding: 16px 16px 16px 60px;
  border: none;
  background: rgba(0, 0, 0, 0.003);
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
}

.new-todo .edit {
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

.destroy {
  display: none;
  position: absolute;
  top: 0;
  right: 10px;
  bottom: 0px;
  width: 40px;
  height: 40px;
  margin: auto 0;
  font-size: 30px;
  color: #cc9a9a;
  margin-bottom: 11px;
  transition: color 0.2s ease-out;
}

.destroy:hover {
  color: #af5b5e;
}

.destroy:after {
  content: "×";
}
</style>

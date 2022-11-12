import { createStore, Store } from "vuex";
import { InjectionKey } from "vue";
import { todoState } from "@/interfaces";
import { todoItem } from "@/interfaces";

export const key: InjectionKey<Store<todoState>> = Symbol();

export default createStore<todoState>({
  state: { todos: [] },
  getters: {
    getTodoById:
      (state) =>
      (id: string): todoItem | undefined => {
        return state.todos.find((todo) => todo.id === id);
      },

    getTodoList:
      (state) =>
      (filter: string): Array<todoItem> => {
        if (filter === "active") return state.todos.filter((t) => !t.done);
        if (filter === "completed") return state.todos.filter((t) => t.done);
        return state.todos;
      },
  },
  mutations: {
    toogleAllDone(state, done: boolean) {
      state.todos = state.todos.map((t) => {
        t.done = done;
        return t;
      });
    },

    setDone(state, id) {
      const todo: todoItem = state.todos.find((t) => t.id === id);
      todo.done = !todo.done;
    },
    addItem(state, item) {
      state.todos.push(item);
    },
    removeItem(state, id) {
      state.todos = state.todos.filter((t) => t.id !== id);
    },
    removeDoneItems(state) {
      const idItemToRemove = state.todos.filter((t) => t.done);
      idItemToRemove.forEach(({ id }) => this.commit("removeItem", id));
    },

    editItem(state, { newVal, id }) {
      state.todos.find((t) => t.id === id).name = newVal;
      state.todos.find((t) => t.id === id).readonly = true;
    },
  },
  actions: {
    toogleAll(context, done: boolean) {
      context.commit("toogleAllDone", done);
    },
    done(context, id: string) {
      context.commit("setDone", id);
    },
    add(context, name: string) {
      const item: todoItem = {
        name,
        done: false,
        id: crypto.randomUUID(),
        readonly: true,
      };
      context.commit("addItem", item);
    },
    edit(context, id: string) {
      context.commit("editItem", id);
    },
    remove(context, id: string) {
      context.commit("removeItem", id);
    },

    removeClompletedTodos(context) {
      context.commit("removeDoneItems");
    },
  },
  modules: {},
});

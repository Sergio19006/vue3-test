import { mount } from "@vue/test-utils";
import TodoList from "@/components/TodoList.vue";
import store from "@/store";

const wrapper = null;

beforeEach(() => {
  const wrapper = mount(TodoList, {
    Mocks: {
      $store: store,
    },
  });
  const input = wrapper.find(".new-todo");
  input.setValue("input test");
  input.trigger("onkeypress.enter");
});

describe("TodoList.vue", () => {
  it("renders TODOS message", () => {
    expect(wrapper.text()).toMatch("TODOS");
  });

  it("Render the new todo list input", () => {
    const input = wrapper.find(".new-todo");
    expect(input).not.toBeNull();
  });

  it("renders TODOS message", () => {
    const input = wrapper.find(".new-todo");
    input.setValue("input test");
    input.trigger("onkeypress.enter");
    const list = wrapper.find(".todo-list").find("li");
    expect(list).not.toBeNull();
  });

  it("toogle all TODOS to done", () => {
    const list = wrapper.find(".todo-list").find("li");
    expect(list).not.toBeNull();
  });
});

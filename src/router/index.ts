import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () => import("../components/TodoList.vue"),
  },
  {
    path: "/active",
    name: "active",

    component: () => import("../components/TodoList.vue"),
  },
  {
    path: "/completed",
    name: "completed",
    component: () => import("../components/TodoList.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

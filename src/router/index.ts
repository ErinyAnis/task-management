import { createRouter, createWebHistory } from "vue-router";

import Home from "../pages/Home.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    }, {
      path: "/tasks/:id",
      name: "task-details",
      component: () => import("../pages/TaskDetail.vue"),
    },
  ],
});

export default router;
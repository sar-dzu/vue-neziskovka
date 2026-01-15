import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";

import BlogView from "../views/BlogView.vue";
import ProjectsView from "../views/ProjectsView.vue";
import PeopleView from "../views/PeopleView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", name: "home", component: HomeView },
    { path: "/about", name: "about", component: AboutView },

    { path: "/blog", name: "blog", component: BlogView },
    { path: "/projects", name: "projects", component: ProjectsView },
    { path: "/people", name: "people", component: PeopleView },
  ],
});

export default router;
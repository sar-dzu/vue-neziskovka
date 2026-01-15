import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";

import BlogView from "../views/BlogView.vue";
import ProjectsView from "../views/ProjectsView.vue";
import PeopleView from "../views/PeopleView.vue";

import BlogDetailView from "../views/BlogDetailView.vue";

import AdminView from "../views/AdminView.vue";
import AdminLoginView from "../views/AdminLoginView.vue";
import AdminNewPostView from "../views/AdminNewPostView.vue";
import AdminEditPostView from "../views/AdminEditPostView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", name: "home", component: HomeView },
    { path: "/about", name: "about", component: AboutView },

    { path: "/blog", name: "blog", component: BlogView },
    { path: "/projects", name: "projects", component: ProjectsView },
    { path: "/people", name: "people", component: PeopleView },

    { path: "/blog/:slug", name: "blog-detail", component: BlogDetailView },

    { path: "/admin", name: "admin", component: AdminView},
    { path: "/admin/login", name: "admin-login", component: AdminLoginView},
    { path: "/admin/posts/new", name: "admin-post-new", component: AdminNewPostView },
    { path: "/admin/posts/:slug/edit", name: "admin-post-edit", component: AdminEditPostView }
  ],
});

router.beforeEach((to) => {
  const authStore = useAuthStore();

  if (to.path.startsWith("/admin") && to.path !== "/admin/login") {
    if (!authStore.isAdminLoggedIn) {
      return "/admin/login";
    }
  }
});

export default router;
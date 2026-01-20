import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth";

const HomeView = () => import("../views/HomeView.vue");
const AboutView = () => import("../views/AboutView.vue");

const BlogView = () => import("../views/BlogView.vue");
const BlogDetailView = () => import("../views/BlogDetailView.vue");

const ProjectsView = () => import("../views/ProjectsView.vue");
const ProjectDetailView = () => import("../views/ProjectDetailView.vue");

const PeopleView = () => import("../views/PeopleView.vue");

const AdminView = () => import("../views/AdminView.vue");
const AdminLoginView = () => import("../views/AdminLoginView.vue");

const AdminPostView = () => import("../views/AdminPostView.vue");
const AdminNewPostView = () => import("../views/AdminNewPostView.vue");
const AdminEditPostView = () => import("../views/AdminEditPostView.vue");

const AdminProjectsView = () => import("../views/AdminProjectsView.vue");
const AdminNewProjectView = () => import("../views/AdminNewProjectView.vue");
const AdminEditProjectView = () => import("../views/AdminEditProjectView.vue");

const NotFoundView = () => import("../views/NotFoundView.vue");


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", name: "home", component: HomeView },
    { path: "/about", name: "about", component: AboutView },

    { path: "/blog", name: "blog", component: BlogView },
    { path: "/projects", name: "projects", component: ProjectsView },
    { path: "/people", name: "people", component: PeopleView },

    { path: "/blog/:slug", name: "blog-detail", component: BlogDetailView },
    { path: "/projects/:slug", name: "project-detail", component: ProjectDetailView },


    { path: "/admin", name: "admin", component: AdminView},
    { path: "/admin/login", name: "admin-login", component: AdminLoginView},

    { path: "/admin/posts", name: "admin-post", component: AdminPostView },
    { path: "/admin/posts/new", name: "admin-post-new", component: AdminNewPostView },
    { path: "/admin/posts/:slug/edit", name: "admin-post-edit", component: AdminEditPostView },

    { path: "/admin/projects", name: "admin-project", component: AdminProjectsView},
    { path: "/admin/projects/new", name: "admin-project-new", component: AdminNewProjectView },
    { path: "/admin/projects/:slug/edit", name: "admin-project-edit", component: AdminEditProjectView },

    { path: "/:pathMatch(.*)*", name: "not-found", component: NotFoundView },

  
  ],
  scrollBehavior() {
    return { top: 0 };
  },
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
import './assets/main.css'
import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import vuetify from "./plugins/vuetify";

import { usePostsStore } from "./stores/posts";
import { useAuthStore } from "./stores/auth";
import { useProjectsStore } from "./stores/projects";


const app = createApp(App);

const pinia = createPinia();
app.use(pinia);
app.use(router);
app.use(vuetify);

const postsStore = usePostsStore(pinia);
postsStore.loadFromStorage();

const authStore = useAuthStore(pinia);
authStore.loadSession?.();

const projectsStore = useProjectsStore(pinia);
projectsStore.loadFromStorage();


app.mount("#app");

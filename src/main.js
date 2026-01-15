import './assets/main.css'
import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import { usePostsStore } from "./stores/posts";
import { useAuthStore } from "./stores/auth";

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);
app.use(router);

const postsStore = usePostsStore(pinia);
postsStore.loadFromStorage();

const authStore = useAuthStore(pinia);
authStore.loadSession();

app.mount("#app");

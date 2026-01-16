<template>
  <main class="container stack">
    <SectionHeader title="Admin" subtitle="Správa obsahu stránky." />

    <div class="grid">
      <div class="surface stack">
        <h2 class="h2">Blog</h2>
        <p class="text">Pridávaj a upravuj články o aktivitách.</p>
        <RouterLink to="/admin/posts" class="btn">Manage blog</RouterLink>
      </div>

      <div class="surface stack">
        <h2 class="h2">Projects</h2>
        <p class="text">Pridávaj a upravuj dlhodobé projekty organizácie.</p>
        <RouterLink to="/admin/projects" class="btn btn-accent">Manage projects</RouterLink>
      </div>
    </div>

    <button class="btn btn-ghost logout-btn" @click="logout">Logout</button>
  </main>
</template>

<script>
import SectionHeader from "../components/SectionHeader.vue";
import { useAuthStore } from "../stores/auth";

export default {
  name: "AdminView",
  components: { SectionHeader },
  data() {
    return { authStore: useAuthStore() };
  },
  methods: {
    logout() {
      this.authStore.logout();
      this.$router.push("/admin/login");
    },
  },
};
</script>

<style scoped>
.grid {
  display: grid;
  gap: 16px;
}

.logout-btn {
  width: fit-content;
}

@media (min-width: 900px) {
  .grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>

<template>
  <main class="container stack">
    <RouterLink :to="backTo" class="btn btn-ghost">← Back to projects</RouterLink>

    <p v-if="!project" class="text">Projekt sa nenašiel.</p>

    <div v-else class="surface stack">
      <h1 class="h1">{{ project.title }}</h1>
      <p class="text">{{ project.shortDescription }}</p>
      <p class="text">{{ project.description }}</p>
    </div>
  </main>
</template>

<script>
import { useProjectsStore } from "../stores/projects";

export default {
  name: "ProjectDetailView",
  data() {
    return {
      projectsStore: useProjectsStore(),
    };
  },
  computed: {
    slug() {
      return this.$route.params.slug;
    },
    project() {
      return this.projectsStore.getBySlug(this.slug);
    },
    backTo() {
      return this.$route.query.from === "admin" ? "/admin/projects" : "/projects";
    },
  },
};
</script>

<style scoped>
.surface {
  overflow-wrap: anywhere;
  word-break: break-word;
}

.h1, .text {
  overflow-wrap: anywhere;
  word-break: break-word;
}
</style>
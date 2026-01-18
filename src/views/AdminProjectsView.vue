<template>
  <main class="container stack">
    <SectionHeader title="Manage projects" subtitle="Pridaj, uprav alebo vymaž projekty." />

    <div class="actions">
      <RouterLink to="/admin/projects/new" class="btn btn-accent">+ New project</RouterLink>
      <RouterLink to="/admin" class="btn btn-primary">Back to admin</RouterLink>
      <button class="btn btn-ghost" @click="logout">Logout</button>
    </div>

    <div v-if="projectsStore.projects.length === 0" class="surface">
      <h3 class="h2">Žiadne projekty</h3>
    </div>

    <div v-else class="stack">
      <div v-for="p in projectsStore.projects" :key="p.id" class="surface row">
        <div>
          <h3 class="h2" style="margin:0">{{ p.title }}</h3>
          <p class="text" style="margin-top:6px">{{ p.shortDescription }}</p>
          <p class="text" style="margin-top:6px">Status: <b>{{ p.status }}</b></p>
        </div>

        <div class="row-actions">
          <RouterLink :to="`/projects/${p.slug}?from=admin`" class="btn btn-ghost">View</RouterLink>
          <RouterLink :to="`/admin/projects/${p.slug}/edit`" class="btn">Edit</RouterLink>
          <button class="btn btn-danger" @click="openDelete(p.slug)">Delete</button>
        </div>
      </div>
    </div>
    <v-dialog v-model="deleteDialog" max-width="520">
      <v-card>
        <v-card-title>Naozaj chceš zmazať projekt?</v-card-title>
        <v-card-text>Túto akciu nie je možné vrátiť späť.</v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" @click="deleteDialog = false">Zrušiť</v-btn>
          <v-btn color="red" @click="confirmDelete">Zmazať</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </main>
</template>

<script>
import SectionHeader from "../components/SectionHeader.vue";
import { useProjectsStore } from "../stores/projects";
import { useAuthStore } from "../stores/auth";
import { useUiStore } from "../stores/ui";

export default {
  name: "AdminProjectsView",
  components: { SectionHeader },
  data() {
    return { projectsStore: useProjectsStore(),
      authStore: useAuthStore(),
      deleteDialog: false,
      slugToDelete: null,
      ui: useUiStore(), };
  },
  methods: {
    logout() {
      this.authStore.logout();
      this.$router.push("/");
    },
    openDelete(slug) {
      this.slugToDelete = slug;
      this.deleteDialog = true;
    },
    confirmDelete() {
      this.projectsStore.deleteProject(this.slugToDelete);
      this.deleteDialog = false;
      this.slugToDelete = null;
      this.ui.toast("Projekt zmazaný", "success");
    },
  },
};
</script>

<style scoped>
.row {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: flex-start;
}

.row-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
}
</style>

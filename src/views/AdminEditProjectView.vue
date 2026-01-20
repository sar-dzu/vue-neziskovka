<template>
  <v-container fluid>
    <main class="container-wide stack">
      <SectionHeader title="Upraviť projekt" subtitle="Uprav existujúci projekt." />

      <p v-if="!project" class="text">Projekt sa nenašiel.</p>

      <v-card v-else class="surface" width="100%">
        <v-card-text>
          <v-form @submit.prevent="save">
            <v-text-field v-model="title" label="Nadpis" variant="outlined" />

            <v-text-field
              v-model="slug"
              label="Slug (nemeníme)"
              variant="outlined"
              disabled
            />

            <v-select
              v-model="status"
              :items="projectStatusOptions"
              item-title="title"
              item-value="value"
              label="Status"
              variant="outlined"
            />

            <v-select
              v-model="tags"
              :items="projectTagOptions"
              label="Tagy"
              variant="outlined"
              multiple
              chips
              closable-chips
            />

            <v-textarea
              v-model="shortDescription"
              label="Úryvok"
              variant="outlined"
              rows="2"
            />

            <v-textarea
              v-model="description"
              label="Opis"
              variant="outlined"
              rows="6"
            />

            <div class="actions">
              <button type="submit" class="btn btn-primary">Uložiť</button>
              <RouterLink to="/admin/projects" class="btn btn-ghost">Zrušiť</RouterLink>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </main>
  </v-container>
</template>

<script>
import SectionHeader from "../components/SectionHeader.vue";
import { useProjectsStore } from "../stores/projects";
import { useUiStore } from "../stores/ui";

export default {
  name: "AdminEditProjectView",
  components: { SectionHeader },
  inject: ["projectTagOptions", "projectStatusOptions"],
  data() {
    return {
      ui: useUiStore(),
      projectsStore: useProjectsStore(),
      //error: "",

      title: "",
      slug: "",
      status: "planned",
      tags: [],
      shortDescription: "",
      description: "",
    };
  },
  computed: {
    routeSlug() {
      return this.$route.params.slug;
    },
    project() {
      return this.projectsStore.getBySlug(this.routeSlug);
    },
  },
  mounted() {
    if (this.project) {
      this.title = this.project.title;
      this.slug = this.project.slug;
      this.status = this.project.status || "planned";
      this.tags = Array.isArray(this.project.tags) ? this.project.tags : [];
      this.shortDescription = this.project.shortDescription;
      this.description = this.project.description;
    }
  },
  methods: {
    save() {
      //this.error = "";

      if (!this.title || !this.shortDescription || !this.description) {
       this.ui.toast("Vyplň všetky povinné polia.", "error");
        return;
      }

      this.projectsStore.updateProject({
        slug: this.slug,
        title: this.title,
        status: this.status,
        tags: this.tags,
        shortDescription: this.shortDescription,
        description: this.description,
      });

      this.ui.toast("Projekt uložený", "success");

      this.$router.push("/admin/projects");
    },
  },
};
</script>

<style scoped>
.error {
  color: #b00020;
  font-weight: 800;
  margin: 8px 0 12px;
}

.actions {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-top: 12px;
  flex-wrap: wrap;
}
</style>

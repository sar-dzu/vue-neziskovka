<template>
  <v-container fluid>
    <main class="container-wide stack">
      <SectionHeader title="New project" subtitle="Pridaj nový projekt." />

      <v-card class="surface" width="100%">
        <v-card-text>
          <v-form @submit.prevent="createProject">
            <v-text-field v-model="title" label="Title" variant="outlined" />
            <v-text-field
              v-model="slug"
              label="Slug"
              variant="outlined"
              @update:modelValue="slugTouched = true"
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
              label="Tags"
              variant="outlined"
              multiple
              chips
              closable-chips
            />

            <v-textarea
              v-model="shortDescription"
              label="Short description"
              variant="outlined"
              rows="2"
            />

            <v-textarea
              v-model="description"
              label="Description"
              variant="outlined"
              rows="6"
            />


            <div class="actions">
              <button type="submit" class="btn btn-primary">Create</button>
              <RouterLink to="/admin/projects" class="btn btn-ghost">Cancel</RouterLink>
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
import { slugify } from "../utils/text.js";
import { useUiStore } from "../stores/ui";

export default {
  name: "AdminNewProjectView",
  components: { SectionHeader },
  inject: ["projectTagOptions", "projectStatusOptions"],
  data() {
    return {
      ui: useUiStore(),
      projectsStore: useProjectsStore(),

      title: "",
      slug: "",
      status: "planned",
      tags: [],
      shortDescription: "",
      description: "",
      //error: "",
      slugTouched: false,
    };
  },
  methods: {
    createProject() {
      //this.error = "";

      if (!this.title || !this.slug || !this.shortDescription || !this.description) {
        this.ui.toast("Vyplň všetky povinné polia.", "error");
        return;
      }

      this.projectsStore.addProject({
        title: this.title,
        slug: this.slug,
        status: this.status,
        tags: this.tags,
        shortDescription: this.shortDescription,
        description: this.description,
      });

      this.ui.toast("Projekt vytvorený", "success");

      this.$router.push("/admin/projects");
    },
  },
  watch: {
    title(newVal) {
        if (!this.slugTouched) this.slug = slugify(newVal);
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

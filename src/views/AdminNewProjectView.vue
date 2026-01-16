<template>
  <v-container fluid>
    <main class="container-wide stack">
      <SectionHeader title="New project" subtitle="Pridaj nový projekt." />

      <v-card class="surface" width="100%">
        <v-card-text>
          <v-form @submit.prevent="createProject">
            <v-text-field v-model="title" label="Title" variant="outlined" />
            <v-text-field v-model="slug" label="Slug (napr. moj-projekt)" variant="outlined" />

            <v-select
              v-model="status"
              :items="statusOptions"
              label="Status"
              variant="outlined"
            />

            <v-select
              v-model="tags"
              :items="tagOptions"
              label="Tags"
              variant="outlined"
              multiple
              chips
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

            <p v-if="error" class="text error">{{ error }}</p>

            <div class="actions">
              <button type="submit" class="btn">Create</button>
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

export default {
  name: "AdminNewProjectView",
  components: { SectionHeader },
  data() {
    return {
      projectsStore: useProjectsStore(),

      title: "",
      slug: "",
      status: "planned",
      tags: [],
      shortDescription: "",
      description: "",
      error: "",

      statusOptions: [
        { title: "Planned", value: "planned" },
        { title: "Ongoing", value: "ongoing" },
        { title: "Finished", value: "finished" },
      ],

      tagOptions: ["Vzdelávanie", "Komunita", "Pomoc", "Výskum", "Mládež", "Médiá"],
    };
  },
  methods: {
    createProject() {
      this.error = "";

      if (!this.title || !this.slug || !this.shortDescription || !this.description) {
        this.error = "Vyplň title, slug, shortDescription a description.";
        return;
      }

      const exists = this.projectsStore.projects.some((p) => p.slug === this.slug);
      if (exists) {
        this.error = "Slug už existuje.";
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

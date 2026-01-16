<template>
  <v-container fluid>
    <main class="container-wide stack">
      <SectionHeader title="Edit project" subtitle="Uprav existujúci projekt." />

      <p v-if="!project" class="text">Projekt sa nenašiel.</p>

      <v-card v-else class="surface" width="100%">
        <v-card-text>
          <v-form @submit.prevent="save">
            <v-text-field v-model="title" label="Title" variant="outlined" />

            <v-text-field
              v-model="slug"
              label="Slug (nemeníme)"
              variant="outlined"
              disabled
            />

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
              <button type="submit" class="btn">Save</button>
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
  name: "AdminEditProjectView",
  components: { SectionHeader },
  data() {
    return {
      projectsStore: useProjectsStore(),
      error: "",

      title: "",
      slug: "",
      status: "planned",
      tags: [],
      shortDescription: "",
      description: "",

      statusOptions: [
        { title: "Planned", value: "planned" },
        { title: "Ongoing", value: "ongoing" },
        { title: "Finished", value: "finished" },
      ],

      tagOptions: ["Vzdelávanie", "Komunita", "Pomoc", "Výskum", "Mládež", "Médiá"],
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
      this.error = "";

      if (!this.title || !this.shortDescription || !this.description) {
        this.error = "Vyplň title, shortDescription a description.";
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

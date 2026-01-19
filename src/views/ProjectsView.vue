<template>
  <main class="container stack">
    <div class="unite">
    <SectionHeader title="Projects" subtitle="Dlhodobé projekty organizácie." />
    <div class="filter-bar">
      <label class="filter">
        <span class="text">Status</span>
        <select v-model="statusFilter" class="btn btn-accent">
          <option v-for="opt in statusOptions" :key="opt.value" :value="opt.value">
            {{ opt.title }}
          </option>
        </select>
      </label>
    </div>
    </div>
    <div class="grid">
      <ProjectCard
        v-for="p in filteredProjects"
        :key="p.id"
        :title="p.title"
        :shortDescription="p.shortDescription"
        :status="p.status"
        :tags="p.tags"
        :to="`/projects/${p.slug}`"
      />
    </div>
    <p v-if="filteredProjects.length === 0" class="text">Pre tento filter zatiaľ nie sú projekty.</p>
  </main>
</template>

<script>
import SectionHeader from "../components/SectionHeader.vue";
import ProjectCard from "../components/ProjectCard.vue";
import { useProjectsStore } from "../stores/projects";

export default {
  name: "ProjectsView",
  components: { SectionHeader, ProjectCard },
  inject: ["projectStatusOptions"],
  data() {
    return {
      projectsStore: useProjectsStore(),
      statusFilter: "all",
    };
  },
  computed: {
    statusOptions() {
      return [
        { title: "Všetky", value: "all" },
        ...(this.projectStatusOptions || []),
      ];
    },
    filteredProjects() {
      if (this.statusFilter === "all") return this.projectsStore.projects;
      return this.projectsStore.projects.filter((p) => p.status === this.statusFilter);
    }
  }
};
</script>

<style scoped>
.grid {
  display: grid;
  gap: 16px;
}

@media (min-width: 900px) {
  .grid {
    grid-template-columns: 1fr 1fr;
  }
}

.unite{
  display: flex;
}

.filter-bar {
  display:flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  margin: auto;
}

.filter {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  max-width: 260px;
}



</style>

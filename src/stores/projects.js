import { defineStore } from "pinia";

const seedProjects = [
  {
    id: 1,
    title: "Komunitné workshopy",
    slug: "komunitne-workshopy",
    shortDescription: "Séria otvorených workshopov pre verejnosť.",
    description: "Tu bude dlhší popis projektu. Ciele, aktivity, výsledky.",
    status: "ongoing",
    tags: ["Vzdelávanie", "Komunita"],
  },
  {
    id: 2,
    title: "Charitatívna zbierka",
    slug: "charitativna-zbierka",
    shortDescription: "Zbierka na podporu rodín v núdzi.",
    description: "Detaily projektu, priebeh, partneri, výsledky.",
    status: "finished",
    tags: ["Pomoc"],
  },
];

export const useProjectsStore = defineStore("projectsStore", {
  state: () => ({
    projects: seedProjects,
  }),

  getters: {
    getBySlug: (state) => (slug) => state.projects.find((p) => p.slug === slug),
  },

  actions: {
    loadFromStorage() {
      const raw = localStorage.getItem("projects");
      if (!raw) return;

      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) this.projects = parsed;
      } catch (e) {
      }
    },

    saveToStorage() {
      localStorage.setItem("projects", JSON.stringify(this.projects));
    },

    addProject(project) {
      const nextId =
        this.projects.length ? Math.max(...this.projects.map((p) => p.id)) + 1 : 1;

      this.projects.unshift({
        id: nextId,
        tags: [],
        ...project,
      });

      this.saveToStorage();
    },

    updateProject(updated) {
      const idx = this.projects.findIndex((p) => p.slug === updated.slug);
      if (idx !== -1) {
        this.projects[idx] = { ...this.projects[idx], ...updated };
        this.saveToStorage();
      }
    },

    deleteProject(slug) {
      this.projects = this.projects.filter((p) => p.slug !== slug);
      this.saveToStorage();
    },
  },
});

<template>
  <article class="surface project-card">
    <div class="top">
      <h3 class="title">{{ title }}</h3>
      <span class="badge" :class="`badge--${status}`">{{ statusLabel }}</span>
    </div>

    <p class="text">{{ shortDescription }}</p>

    <div v-if="tags && tags.length" class="tags">
      <span v-for="t in tags" :key="t" class="tag">{{ t }}</span>
    </div>

    <RouterLink :to="to" class="btn btn-ghost">Zobraziť projekt</RouterLink>
  </article>
</template>

<script>
export default {
  name: "ProjectCard",
  inject: ["projectStatusOptions"],
  props: {
    title: { type: String, required: true },
    shortDescription: { type: String, required: true },
    status: { type: String, required: true },
    tags: { type: Array, default: () => [] },
    to: { type: [String, Object], required: true },
  },
  computed: {
    statusLabel() {
      const found = (this.projectStatusOptions || []).find((s) => s.value === this.status);
      return found ? found.title : this.status;
    },
  },
};
</script>

<style scoped>
.project-card {
  display: grid;
  gap: 12px;
}

.top {
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 12px;
}

.title {
  font-size: 18px;
  font-weight: 800;
}

.badge {
  font-size: 12px;
  font-weight: 800;
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: rgba(0,0,0,0.03);
}

.badge--planned {
  background: rgba(82, 149, 184, 0.15);
}
.badge--ongoing {
  background: rgba(212, 117, 89, 0.12);
}
.badge--finished {
  background: rgba(37, 150, 190, 0.35);
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  font-size: 12px;
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: rgba(0,0,0,0.03);
}
</style>

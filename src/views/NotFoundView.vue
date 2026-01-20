<template>
  <main class="container stack">
    <SectionHeader title="404" subtitle="Stránka sa nenašla." />

    <div class="surface">
      <p class="text">
        Odkaz môže byť nesprávny alebo stránka už neexistuje.
      </p>

      <div style="display:flex; gap:12px; flex-wrap:wrap; margin-top:12px">
        <RouterLink to="/" class="btn btn-accent">Domov</RouterLink>
        <RouterLink to="/blog" class="btn btn-ghost">Blog</RouterLink>
        <RouterLink to="/projects" class="btn btn-ghost">Projekty</RouterLink>
      </div>
    </div>
  </main>
</template>

<script>
import SectionHeader from "../components/SectionHeader.vue";

export default {
  name: "NotFoundView",
  components: { SectionHeader },
};
</script>
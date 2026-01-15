<template>
  <main class="container">
    <SectionHeader :title="title" :subtitle="date" />

    <p class="text">
      Toto je detail článku. Neskôr sem dáme celý text článku podľa slug: <b>{{ slug }}</b>.
    </p>

    <RouterLink to="/blog" class="back">← Späť na blog</RouterLink>
  </main>
</template>

<script>
import SectionHeader from "../components/SectionHeader.vue";

export default {
  name: "BlogDetailView",
  components: { SectionHeader },
  computed: {
    slug() {
      return this.$route.params.slug;
    },
    title() {
      return "Detail článku";
    },
    date() {
      return "Dátum: (doplníme neskôr)";
    },
  },
};
</script>

<style scoped>
.back {
  display: inline-block;
  margin-top: 16px;
  font-weight: 700;
}
</style>

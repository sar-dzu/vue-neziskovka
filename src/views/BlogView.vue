<template>
  <main class="container">
    <SectionHeader title="Blog" subtitle="Tu budú články o aktivitách." />

    <div class="grid">
      <PostCard
        v-for="post in posts"
        :key="post.slug"
        :title="post.title"
        :excerpt="post.excerpt"
        :date="post.date"
        :tag="post.tag"
        :to="`/blog/${post.slug}`"
      />
    </div>
  </main>
</template>

<script>
import SectionHeader from "../components/SectionHeader.vue";
import PostCard from "../components/PostCard.vue";

export default {
  name: "BlogView",
  components: {
    SectionHeader,
    PostCard,
  },
  data() {
    return {
      posts: [
        {
          title: "Dobrovoľnícky deň v komunite",
          excerpt: "Krátke zhrnutie toho, čo sme robili a čo sa podarilo.",
          date: "2026-01-10",
          tag: "Aktivity",
          slug: "dobrovolnicky-den",
        },
        {
          title: "Workshop: Participácia v praxi",
          excerpt: "Ako vyzerá participácia v meste a čo to znamená pre ľudí.",
          date: "2026-01-06",
          tag: "Vzdelávanie",
          slug: "workshop-participacia",
        },
        {
          title: "Spolupráca s miestnou samosprávou",
          excerpt: "Stretli sme sa so zástupcami mesta a dohodli ďalšie kroky.",
          date: "2025-12-20",
          tag: "Partnerstvá",
          slug: "spolupraca-so-samospravou",
        },
      ],
    };
  },
};
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

@media (min-width: 900px) {
  .grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>

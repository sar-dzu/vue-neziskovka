<template>
  <main class="container stack">
    <SectionHeader title="Blog" subtitle="Články o aktivitách." />

    <div class="surface">
      <v-text-field
        v-model="q"
        label="Search"
        variant="outlined"
        clearable
        hide-details
      />
      <p class="text" v-if="postsStore.posts.length">
        Zobrazené: {{ filteredPosts.length }} / {{ postsStore.posts.length }}
      </p>
    </div>

    <div v-if="postsStore.posts.length === 0" class="surface">
      <h3 class="h2">Zatiaľ tu nie sú žiadne články.</h3>
    </div>

    <div v-else-if="filteredPosts.length === 0" class="surface">
      <h3 class="h2">Nič sa nenašlo.</h3>
      <p class="text">Skús iné kľúčové slovo.</p>
    </div>

    <div v-else class="grid">
      <PostCard
        v-for="p in pagedPosts"
        :key="p.slug"
        :title="p.title"
        :excerpt="p.excerpt"
        :date="p.date"
        :tag="p.tag"
        :to="`/blog/${p.slug}`"
      />
    </div>

    <div v-if="totalPages > 1" class="pager">
      <v-pagination
        v-model="page"
        :length="totalPages"
        :total-visible="6"
      />
    </div>
  </main>
</template>


<script>
import SectionHeader from "../components/SectionHeader.vue";
import PostCard from "../components/PostCard.vue";
import { usePostsStore } from "../stores/posts";

export default {
  name: "BlogView",
  components: { SectionHeader, PostCard },
  data() {
    return {
      postsStore: usePostsStore(),
      page: 1,
      perPage: 6,
      q: "",
    };
  },
  computed: {
    filteredPosts() {
      const query = (this.q || "").trim().toLowerCase();
      if (!query) return this.postsStore.posts;

      return this.postsStore.posts.filter((p) => {
        const hay = [
          p.title,
          p.excerpt,
          p.content,
          p.tag,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return hay.includes(query);
      });
    },
    totalPages() {
      return Math.ceil(this.filteredPosts.length / this.perPage);
    },
    pagedPosts() {
      const start = (this.page - 1) * this.perPage;
      return this.filteredPosts.slice(start, start + this.perPage);
    },
  },
  watch: {
    q() {
      this.page = 1;
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    "filteredPosts.length"() {
      if (this.page > this.totalPages) this.page = this.totalPages || 1;
    },
    page() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
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

.pager {
  display: flex;
  justify-content: center;
  padding: 8px 0 0;
}

</style>

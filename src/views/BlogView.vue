<template>
  <main class="container stack">
    <SectionHeader title="Blog" subtitle="Články o aktivitách." />

    <div class="grid">
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
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.postsStore.posts.length / this.perPage);
    },
    pagedPosts() {
      const start = (this.page - 1) * this.perPage;
      return this.postsStore.posts.slice(start, start + this.perPage);
    },
  },
  watch: {
    "postsStore.posts.length"() {
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

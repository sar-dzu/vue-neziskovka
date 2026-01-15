<template>
  <main class="container">
    <SectionHeader title="Blog" subtitle="Tu budú články o aktivitách." />

    <div class="grid">
      <PostCard
        v-for="post in postsStore.posts"
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
import { usePostsStore } from "../stores/posts";

export default {
  name: "BlogView",
  components: {
    SectionHeader,
    PostCard,
  },
  data() {
    return {
      postsStore: usePostsStore(),
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

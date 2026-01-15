<template>
  <main class="container">
    <SectionHeader
      v-if="post"
      :title="post.title"
      :subtitle="post.date"
    />

    <p v-if="post" class="text">
      {{ post.content }}
    </p>

    <p v-else class="text">
      Článok sa nenašiel.
    </p>

    <RouterLink to="/blog" class="back">← Späť na blog</RouterLink>
  </main>
</template>

<script>
import SectionHeader from "../components/SectionHeader.vue";
import { usePostsStore } from "../stores/posts";

export default {
  name: "BlogDetailView",
  components: { SectionHeader },
  data() {
    return {
      postsStore: usePostsStore(),
    };
  },
  computed: {
    slug() {
      return this.$route.params.slug;
    },
    post() {
      return this.postsStore.getBySlug(this.slug);
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

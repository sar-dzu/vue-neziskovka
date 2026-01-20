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

    <RouterLink :to="backTo" class="btn btn-ghost">← Späť</RouterLink>
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
    backTo() {
      return this.$route.query.from === "admin" ? "/admin/posts" : "/blog";
    },
  },
};
</script>


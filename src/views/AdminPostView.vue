<template>
  <main class="container">
    <SectionHeader
      title="Admin – Blog"
      subtitle="Správa blogových článkov."
    />

    <div class="admin-actions">
      <RouterLink class="btn btn-accent" to="/admin/posts/new">+ New post</RouterLink>
      <RouterLink to="/admin" class="btn btn-primary">Back to admin</RouterLink>
      <button class="btn btn-ghost" @click="logout">Logout</button>
    </div>

    <div class="list">
      <div
        v-for="post in postsStore.posts"
        :key="post.slug"
        class="row surface"
      >
        <div>
          <div class="h2">{{ post.title }}</div>
          <p class="text">{{ post.date }} • {{ post.tag }}</p>
        </div>

        <div class="row-actions">
            <RouterLink :to="`/blog/${post.slug}?from=admin`" class="btn">View</RouterLink>
            <RouterLink :to="`/admin/posts/${post.slug}/edit`" class="btn">Edit</RouterLink>
            <button class="btn btn-danger" @click="deletePost(post.slug)">Delete</button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import SectionHeader from "../components/SectionHeader.vue";
import { useAuthStore } from "../stores/auth";
import { usePostsStore } from "../stores/posts";

export default {
  name: "AdminView",
  components: { SectionHeader },
  data() {
    return {
      authStore: useAuthStore(),
      postsStore: usePostsStore(),
    };
  },
  methods: {
    logout() {
      this.authStore.logout();
      this.$router.push("/");
    },
    deletePost(slug) {
      if (confirm("Naozaj chceš zmazať tento článok?")) {
        this.postsStore.deletePost(slug);
      }
    },
  },
};
</script>

<style scoped>
.admin-actions {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.list {
  display: grid;
  gap: 12px;
}

.row {
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
  box-shadow: var(--shadow);
}

.row-actions {
  display: flex;
  gap: 10px;
}
</style>

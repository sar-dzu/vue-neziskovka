<template>
  <main class="container">
    <SectionHeader
      title="Admin – Blog"
      subtitle="Správa blogových článkov."
    />

    <div class="admin-actions">
      <RouterLink to="/admin/posts/new">
        + New post
      </RouterLink>

      <button class="btn-ghost" @click="logout">Logout</button>
    </div>

    <div class="list">
      <div
        v-for="post in postsStore.posts"
        :key="post.slug"
        class="row"
      >
        <div>
          <div class="h2">{{ post.title }}</div>
          <p class="text">{{ post.date }} • {{ post.tag }}</p>
        </div>

        <div class="row-actions">
            <RouterLink :to="`/blog/${post.slug}?from=admin`" class="btn-ghost">View</RouterLink>
            <RouterLink :to="`/admin/posts/${post.slug}/edit`" class="btn">Edit</RouterLink>
            <button class="btn-danger" @click="deletePost(post.slug)">Delete</button>
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border: 1px solid rgba(0,0,0,0.08);
  border-radius: 12px;
  background: #1E3A5F;
}

.row-actions {
  display: flex;
  gap: 10px;
}
</style>

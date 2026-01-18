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

    <div v-if="postsStore.posts.length === 0" class="stack">
      <h3 class="h2">Žiadne články</h3>
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
            <button class="btn btn-danger" @click="openDelete(post.slug)">Delete</button>
        </div>
      </div>
    </div>
    <v-dialog v-model="deleteDialog" max-width="520">
      <v-card>
        <v-card-title>Naozaj chceš zmazať článok?</v-card-title>
        <v-card-text>Túto akciu nie je možné vrátiť späť.</v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" @click="deleteDialog = false">Zrušiť</v-btn>
          <v-btn color="red" @click="confirmDelete">Zmazať</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </main>
</template>

<script>
import SectionHeader from "../components/SectionHeader.vue";
import { useAuthStore } from "../stores/auth";
import { usePostsStore } from "../stores/posts";
import { useUiStore } from "../stores/ui";

export default {
  name: "AdminView",
  components: { SectionHeader },
  data() {
    return {
      authStore: useAuthStore(),
      postsStore: usePostsStore(),
      deleteDialog: false,
      slugToDelete: null,
      ui: useUiStore(),
    };
  },
  methods: {
    logout() {
      this.authStore.logout();
      this.$router.push("/");
    },
    openDelete(slug) {
      this.slugToDelete = slug;
      this.deleteDialog = true;
    },
    confirmDelete() {
      this.postsStore.deletePost(this.slugToDelete);
      this.deleteDialog = false;
      this.slugToDelete = null;
      this.ui.toast("Článok zmazaný", "success");
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

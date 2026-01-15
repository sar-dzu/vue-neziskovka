<template>
  <main class="container">
    <SectionHeader
      title="New blog post"
      subtitle="Pridaj nový článok do blogu."
    />

    <form class="form" @submit.prevent="createPost">
      <label>
        <span class="text">Title</span>
        <input v-model="title" />
      </label>

      <label>
        <span class="text">Slug</span>
        <input v-model="slug" />
      </label>

      <label>
        <span class="text">Date</span>
        <input v-model="date" placeholder="2026-01-15" />
      </label>

      <label>
        <span class="text">Tag</span>
        <input v-model="tag" />
      </label>

      <label>
        <span class="text">Excerpt</span>
        <textarea rows="3" v-model="excerpt"></textarea>
      </label>

      <label>
        <span class="text">Content</span>
        <textarea rows="6" v-model="content"></textarea>
      </label>

      <p v-if="error" class="text error">
        {{ error }}
      </p>

      <div class="actions">
        <button class="btn" type="submit">Create</button>
        <RouterLink to="/admin">Cancel</RouterLink>
      </div>
    </form>
  </main>
</template>

<script>
import SectionHeader from "../components/SectionHeader.vue";
import { usePostsStore } from "../stores/posts";

export default {
  name: "AdminNewPostView",
  components: { SectionHeader },
  data() {
    return {
      postsStore: usePostsStore(),
      title: "",
      slug: "",
      date: "",
      tag: "",
      excerpt: "",
      content: "",
      error: "",
    };
  },
  methods: {
    createPost() {
      this.error = "";

      if (!this.title || !this.slug || !this.date || !this.excerpt || !this.content) {
        this.error = "Vyplň všetky povinné polia.";
        return;
      }

      const exists = this.postsStore.posts.some(
        (p) => p.slug === this.slug
      );

      if (exists) {
        this.error = "Slug už existuje.";
        return;
      }

      this.postsStore.addPost({
        title: this.title,
        slug: this.slug,
        date: this.date,
        tag: this.tag || "Aktivity",
        excerpt: this.excerpt,
        content: this.content,
      });

      this.$router.push("/admin");
    },
  },
};
</script>

<style scoped>
.form {
  max-width: 600px;
  display: grid;
  gap: 12px;
  margin-top: 16px;
}

label {
  display: grid;
  gap: 4px;
}

input,
textarea {
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid rgba(0,0,0,0.15);
  font-family: inherit;
}

.actions {
  display: flex;
  gap: 12px;
  margin-top: 8px;
}

.error {
  color: #b00020;
}
</style>

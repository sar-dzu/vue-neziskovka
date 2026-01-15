<template>
  <main class="container">
    <SectionHeader
      title="Edit blog post"
      subtitle="Uprav existujúci článok."
    />

    <p v-if="!post" class="text">
      Článok sa nenašiel.
    </p>

    <form v-else class="form" @submit.prevent="save">
      <label>
        <span class="text">Title</span>
        <input v-model="title" />
      </label>

      <label>
        <span class="text">Slug (nemeníme)</span>
        <input v-model="slug" disabled />
      </label>

      <label>
        <span class="text">Date</span>
        <input v-model="date" />
      </label>

      <label>
        <span class="text">Tag</span>
        <select v-model="tag">
          <option v-for="t in tagOptions" :key="t" :value="t">{{ t }}</option>
        </select>
      </label>

      <label>
        <span class="text">Excerpt</span>
        <textarea rows="3" v-model="excerpt"></textarea>
      </label>

      <label>
        <span class="text">Content</span>
        <textarea rows="6" v-model="content"></textarea>
      </label>

      <p v-if="error" class="text error">{{ error }}</p>

      <div class="actions">
        <button type="submit" class="btn">Save</button>
        <RouterLink to="/admin" class="btn-ghost">Cancel</RouterLink>
      </div>
    </form>
  </main>
</template>

<script>
import SectionHeader from "../components/SectionHeader.vue";
import { usePostsStore } from "../stores/posts";

export default {
  name: "AdminEditPostView",
  components: { SectionHeader },
  data() {
    return {
      postsStore: usePostsStore(),
      error: "",

      title: "",
      slug: "",
      date: "",
      tagOptions: ["Aktivity", "Vzdelávanie", "Partnerstvá", "Výskum", "Médiá"],
      excerpt: "",
      content: "",
    };
  },
  computed: {
    routeSlug() {
      return this.$route.params.slug;
    },
    post() {
      return this.postsStore.getBySlug(this.routeSlug);
    },
  },
  mounted() {
    if (this.post) {
      this.title = this.post.title;
      this.slug = this.post.slug;
      this.date = this.post.date;
      this.tag = this.post.tag;
      this.excerpt = this.post.excerpt;
      this.content = this.post.content;
    }
  },
  methods: {
    save() {
      this.error = "";

      if (!this.title || !this.date || !this.excerpt || !this.content) {
        this.error = "Vyplň prosím title, date, excerpt a content.";
        return;
      }

      this.postsStore.updatePost({
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
textarea,
select {
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  font-family: inherit;
}

.actions {
  display: flex;
  gap: 12px;
  margin-top: 8px;
}

.error {
  color: #b00020;
  font-weight: 800;
}
</style>

<template>
  <v-container fluid>
    <main class="container">
    <SectionHeader title="New blog post" subtitle="Pridaj nový článok do blogu." />

    <v-card class="surface" max-width="1100">
      <v-card-text>
        <v-form @submit.prevent="createPost">
          <v-text-field v-model="title" label="Title" variant="outlined" />
          <v-text-field v-model="slug" label="Slug (napr. moja-aktivita)" variant="outlined" />
          <v-text-field v-model="date" label="Date (YYYY-MM-DD)" variant="outlined" />

          <v-select
            v-model="tag"
            :items="tagOptions"
            label="Tag"
            variant="outlined"
          />

          <v-textarea v-model="excerpt" label="Excerpt (short)" variant="outlined" rows="3" />
          <v-textarea v-model="content" label="Content (full text)" variant="outlined" rows="6" />

          <p v-if="error" class="text error">{{ error }}</p>

          <div class="actions">
            <button type="submit" class="btn btn-primary">Create</button>
            <RouterLink to="/admin/posts" class="btn btn-ghost">Cancel</RouterLink>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
    </main>
  </v-container>
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

      tagOptions: ["Aktivity", "Vzdelávanie", "Partnerstvá", "Výskum", "Médiá"],
      tag: "Aktivity",

      title: "",
      slug: "",
      date: "",
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

      const exists = this.postsStore.posts.some((p) => p.slug === this.slug);
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

      this.$router.push("/admin/posts");
    },
  },
};
</script>

<style scoped>
.error {
  color: #b00020;
  font-weight: 800;
  margin: 8px 0 12px;
}

.actions {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-top: 12px;
}

</style>
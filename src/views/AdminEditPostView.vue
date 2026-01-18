<template>
  <v-container fluid>
    <main class="container">
    <SectionHeader title="Edit blog post" subtitle="Uprav existujúci článok." />

    <p v-if="!post" class="text">
      Článok sa nenašiel.
    </p>
    <v-card v-else class="surface" width="100%">
      <v-card-text>
        <v-form @submit.prevent="save">
          <v-text-field
            v-model="title"
            label="Title"
            variant="outlined"
          />

          <v-text-field
            v-model="slug"
            label="Slug (nemeníme)"
            variant="outlined"
            disabled
          />

          <v-text-field
            :model-value="date"
            label="Created at"
            variant="outlined"
            disabled
          />

          <v-select
            v-model="tag"
            :items="blogTagOptions"
            label="Tag"
            variant="outlined"
          />

          <v-textarea
            v-model="excerpt"
            label="Excerpt"
            variant="outlined"
            rows="3"
          />

          <v-textarea
            v-model="content"
            label="Content"
            variant="outlined"
            rows="6"
          />

          <div class="actions">
            <button type="submit" class="btn btn-primary">Save</button>
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
import { useUiStore } from "../stores/ui";

export default {
  name: "AdminEditPostView",
  components: { SectionHeader },
  inject: ["blogTagOptions"],
  data() {
    return {
      ui: useUiStore(),
      postsStore: usePostsStore(),
      //error: "",

      title: "",
      slug: "",
      date: "",
      tag: "Aktivity",
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
      //this.error = "";

      if (!this.title || !this.date || !this.excerpt || !this.content) {
        this.ui.toast("Vyplň všetky povinné polia.", "error");
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

      this.ui.toast("Článok uložený", "success");
      this.$router.push("/admin/posts");

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

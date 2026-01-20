<template>
  <v-container fluid>
    <main class="container">
    <SectionHeader title="Nový príspevok" subtitle="Pridaj nový článok do blogu." />

    <v-card class="surface" max-width="1100">
      <v-card-text>
        <v-form @submit.prevent="createPost">
          <v-text-field v-model="title" label="Nadpis" variant="outlined" />
          <v-text-field
            v-model="slug"
            label="Slug"
            variant="outlined"
            @update:modelValue="slugTouched = true"
          />

          <v-select
            v-model="tag"
            :items="blogTagOptions"
            label="Tagy"
            variant="outlined"
          />

          <v-textarea v-model="excerpt" label="Úryvok" variant="outlined" rows="3" />
          <v-textarea v-model="content" label="Obsah" variant="outlined" rows="6" />


          <div class="actions">
            <button type="submit" class="btn btn-primary">Pridať</button>
            <RouterLink to="/admin/posts" class="btn btn-ghost">Zrušiť</RouterLink>
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
import { slugify, nowStamp } from "../utils/text.js";
import { useUiStore } from "../stores/ui";

export default {
  name: "AdminNewPostView",
  components: { SectionHeader },
  inject: ["blogTagOptions"],
  data() {
    return {
      ui: useUiStore(),
      postsStore: usePostsStore(),
      tag: "Aktivity",
      title: "",
      slug: "",
      date: "",
      excerpt: "",
      content: "",
      //error: "",
      slugTouched: false,
    };
  },
  methods: {
    createPost() {
      //this.error = "";

      if (!this.title || !this.slug || !this.excerpt || !this.content) {
        this.ui.toast("Vyplň všetky povinné polia.", "error");
        return;
      }

      this.postsStore.addPost({
        title: this.title,
        slug: this.slug,
        date: nowStamp(),
        tag: this.tag || "Aktivity",
        excerpt: this.excerpt,
        content: this.content,
      });

      this.ui.toast("Článok vytvorený", "success");

      this.$router.push("/admin/posts");
    },
    
  },
  watch: {
    title(newVal) {
      if (!this.slugTouched) this.slug = slugify(newVal);
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
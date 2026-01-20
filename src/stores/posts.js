import { defineStore } from "pinia";

export const usePostsStore = defineStore("postsStore", {
  state: () => {
    return {
      posts: [
        {
          title: "Dobrovoľnícky deň v komunite",
          excerpt: "Krátke zhrnutie toho, čo sme robili a čo sa podarilo.",
          date: "2026-01-10",
          tag: "Aktivity",
          slug: "dobrovolnicky-den",
          content: "Toto je celý text článku (placeholder).",
        },
        {
          title: "Workshop: Participácia v praxi",
          excerpt: "Ako vyzerá participácia v meste a čo to znamená pre ľudí.",
          date: "2026-01-06",
          tag: "Vzdelávanie",
          slug: "workshop-participacia",
          content: "Toto je celý text článku (placeholder).",
        },
        {
          title: "Spolupráca s miestnou samosprávou",
          excerpt: "Stretli sme sa so zástupcami mesta a dohodli ďalšie kroky.",
          date: "2025-12-20",
          tag: "Partnerstvá",
          slug: "spolupraca-so-samospravou",
          content: "Toto je celý text článku (placeholder).",
        }
      ]
    };
  },

  getters: {
    getBySlug: (state) => {return (slug) => state.posts.find((p) => p.slug === slug);}
  },

  actions: {
    loadFromStorage() {
        const raw = localStorage.getItem("posts");
        if (raw) {
            try {
                const parsed = JSON.parse(raw);
                if (Array.isArray(parsed)) {
                    this.posts = parsed;
                }
            } catch (e) {
            }
        }
    },
    saveToStorage() {
        localStorage.setItem("posts", JSON.stringify(this.posts));
    },
    addPost(newPost) {
      const uniqueSlug = this.makeUniqueSlug(newPost.slug);

      this.posts.unshift({
        ...newPost,
        slug: uniqueSlug,
      });

      this.saveToStorage();
    },
    updatePost(updatedPost) {
        const index = this.posts.findIndex((p) => p.slug === updatedPost.slug);
        if (index !== -1) {
            this.posts[index] = updatedPost;
            this.saveToStorage();
        }
    },
    deletePost(slug) {
        this.posts = this.posts.filter((p) => p.slug !== slug);
        this.saveToStorage();
    },
    makeUniqueSlug(base) {
      let candidate = base;
      let i = 2;

      while (this.getBySlug(candidate)) {
        candidate = `${base}-${i}`;
        i++;
      }
      return candidate;
    },
},
});
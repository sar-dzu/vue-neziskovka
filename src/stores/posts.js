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
    addPost(newPost) {
      this.posts.unshift(newPost);
    },
    deletePost(slug) {
      this.posts = this.posts.filter((p) => p.slug !== slug);
    }
  }
});
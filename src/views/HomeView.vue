<template>
  <main class="container stack">
    <section class="hero surface">
      <div class="hero-grid">
        <div class="stack">
          <h1 class="h1">Aktivity, ktoré majú zmysel</h1>
          <p class="text">
            Vitaj na informačnej stránke našej neziskovej organizácie. Nájdeš tu blog o aktivitách,
            prehľad projektov a náš tím.
          </p>

          <div class="hero-actions">
            <RouterLink to="/blog" class="btn btn-accent">Pozrieť blog</RouterLink>
            <RouterLink to="/projects" class="btn btn-ghost">Pozrieť projekty</RouterLink>
          </div>
        </div>

        <div class="hero-box">
          <div class="stat">
            <div class="stat-number">{{ projectsCount }}</div>
            <div class="text">{{ projectsLabel }}</div>
          </div>
          <div class="stat">
            <div class="stat-number">{{ ongoingCount }}</div>
            <div class="text">v procese</div>
          </div>
          <div class="stat">
            <div class="stat-number">{{ postsCount }}</div>
            <div class="text">{{ postsLabel }}</div>
          </div>
        </div>
      </div>
    </section>

    <div class="section-divider"></div>

    <section class="strip strip--light stack">
      <div class="section-top">
        <h2 class="h2">Články</h2>
        <RouterLink to="/blog" class="btn btn-ghost">Všetky články</RouterLink>
      </div>

      <div class="grid">
        <PostCard
          v-for="p in latestPosts"
          :key="p.slug"
          :title="p.title"
          :excerpt="p.excerpt"
          :date="p.date"
          :tag="p.tag"
          :to="`/blog/${p.slug}`"
        />
      </div>
    </section>

    <div class="section-divider"></div>

    <section class="strip strip--tint stack">
      <div class="section-top">
        <h2 class="h2">Vybrané projekty</h2>
        <RouterLink to="/projects" class="btn btn-ghost">Všetky projekty</RouterLink>
      </div>

      <div class="grid">
        <ProjectCard
          v-for="pr in featuredProjects"
          :key="pr.id"
          :title="pr.title"
          :shortDescription="pr.shortDescription"
          :status="pr.status"
          :tags="pr.tags"
          :to="`/projects/${pr.slug}`"
        />
      </div>
    </section>

    <section class="about-strip">
      <div class="about-inner">
        <div class="stack">
          <h2 class="h2">O nás</h2>
          <p class="text">
            Sme nezisková organizácia zameraná na komunitu, vzdelávanie a projekty s reálnym dopadom.
            Na tejto stránke nájdeš náš blog, prehľad projektov a tím.
          </p>

          <div class="about-actions">
            <RouterLink to="/about" class="btn btn-accent">Zistiť viac</RouterLink>
            <RouterLink to="/people" class="btn btn-ghost">Náš tím</RouterLink>
          </div>
        </div>

        <div class="about-card surface">
          <h3 class="mini-title">Kontakt</h3>
          <p class="text">info@neziskovka.sk</p>
          <p class="text">+421 900 000 000</p>
          <p class="text">Mesto xxx</p>
        </div>
      </div>
    </section>

  </main>
</template>

<script>
import PostCard from "../components/PostCard.vue";
import ProjectCard from "../components/ProjectCard.vue";
import { usePostsStore } from "../stores/posts";
import { useProjectsStore } from "../stores/projects";

export default {
  name: "HomeView",
  components: { PostCard, ProjectCard },
  data() {
    return {
      postsStore: usePostsStore(),
      projectsStore: useProjectsStore(),
    };
  },
  computed: {
    latestPosts() {
      // prvé 2 z store
      return this.postsStore.posts.slice(0, 2);
    },
    featuredProjects() {
      // 2 projekty: prefer ongoing
      const ongoing = this.projectsStore.projects.filter((p) => p.status === "ongoing");
      const rest = this.projectsStore.projects.filter((p) => p.status !== "ongoing");
      return [...ongoing, ...rest].slice(0, 2);
    },
    ongoingCount() {
      return this.projectsStore.projects.filter((p) => p.status === "ongoing").length;
    },
    projectsCount() {
      return this.projectsStore.projects.length;
    },
    projectsLabel() {
      const count = this.projectsCount;
      if (count === 1) return "projekt";
      if (count >= 2 && count <= 4) return "projekty";
      return "projektov";
    },
    postsCount() {
      return this.postsStore.posts.length
    },
    postsLabel() {
      const count = this.postsCount;
      if (count === 1) return "článok";
      if (count >= 2 && count <= 4) return "články";
      return "článkov";
    },
  },
};
</script>

<style scoped>
.hero {
  padding: 28px;
}

.hero-grid {
  display: grid;
  gap: 18px;
}

.hero-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.hero-box {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.strip {
  border-radius: var(--radius);
  padding: 18px;
}

.strip--light {
  background: rgba(212, 117, 89, 0.15);
  border: 1px solid var(--border);
}

.strip--tint {
  background: rgba(82, 149, 184, 0.10);
  border: 1px solid rgba(82, 149, 184, 0.18);
}

.stat {
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 12px;
  background: rgba(0, 0, 0, 0.02);
  text-align: center;
}

.stat-number {
  font-weight: 900;
  font-size: 22px;
  margin-bottom: 6px;
}

.section-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.grid {
  display: grid;
  gap: 16px;
}

@media (min-width: 900px) {
  .hero-grid {
    grid-template-columns: 1.3fr 1fr;
    align-items: start;
  }

  .grid {
    grid-template-columns: 1fr 1fr;
  }
}


.section-divider {
  height: 1px;
  background: var(--border);
  margin: 12px 0;
}

.about-strip {
  margin-top: 28px;
  padding: 26px 0 8px;
  border-top: 1px solid var(--border);
}

.about-inner {
  display: grid;
  gap: 16px;
}

.about-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.mini-title {
  font-size: 14px;
  font-weight: 900;
  margin-bottom: 8px;
}

@media (min-width: 900px) {
  .about-inner {
    grid-template-columns: 1.4fr 1fr;
    align-items: start;
  }
}

</style>

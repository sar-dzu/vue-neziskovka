<template>
    <article class="card">
        <div class="meta">
            <span class="date">{{ date }}</span>
            <span v-if="tag" class="tag">{{ tag }}</span>
        </div>
        <h2 class="title">{{ title }}</h2>
        <p class="excerpt">{{ excerpt }}</p>
        <RouterLink :to="to" class="read-more">Čítať viac</RouterLink>
    </article>
    
</template>

<script>
export default {
  name: "PostCard",
  props: {
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    date: { type: String, required: true },
    to: { type: String, required: true },
    tag: { type: String, default: "" },
  },
};
</script>

<style scoped>
.card {
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  padding: 16px;
  background: #1E3A5F;
}

.meta {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 10px;
  opacity: 0.8;
  font-size: 13px;
}

.tag {
  padding: 2px 8px;
  border-radius: 999px;
  background: rgba(30, 58, 95, 0.1);
}

.title {
  font-size: 18px;
  font-weight: 700;
  margin: 8px 0 8px;
}

.excerpt {
  margin: 0 0 12px;
  line-height: 1.6;
  opacity: 0.95;
}

.read-more {
  display: inline-block;
  font-weight: 700;
  opacity: 0.9;
}

.read-more:hover {
  opacity: 1;
  text-decoration: underline;
}
</style>
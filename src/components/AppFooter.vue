<template>
  <footer class="footer">
    <div class="footer-inner">
      <p class="text small">© {{ year }} Neziskovka. Všetky práva vyhradené.</p>

      <div class="links">
        <RouterLink to="/about" class="footer-link">O nás</RouterLink>
        <RouterLink to="/blog" class="footer-link">Blog</RouterLink>
        <RouterLink to="/projects" class="footer-link">Projects</RouterLink>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "AppFooter",
  computed: {
    year() {
      return new Date().getFullYear();
    },
  },
};
</script>

<style scoped>
.footer {
  margin-top: 40px;
  border-top: 1px solid var(--border);
  background: rgba(0, 0, 0, 0.02);
}

.footer-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 18px 16px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.small {
  font-size: 13px;
  opacity: 0.9;
}

.links {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.footer-link {
  font-weight: 800;
  opacity: 0.85;
  padding: 6px 10px;
  border-radius: 999px;
}

.footer-link:hover {
  background: rgba(0,0,0,0.05);
  opacity: 1;
}
</style>

<template>
  <nav class="navbar">
    <div class="brand">Neziskovka</div>

    <div class="links">
      <RouterLink to="/" class="link">Home</RouterLink>
      <RouterLink to="/projects" class="link">Projects</RouterLink>
      <RouterLink to="/blog" class="link">Blog</RouterLink>
      <RouterLink to="/people" class="link">People</RouterLink>
      <RouterLink to="/about" class="link">About</RouterLink>
    </div>
  </nav>
</template>

<script>
export default {
  name: "AppNavbar",
};
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: #1E3A5F;
  color: white;
}

.brand {
  font-weight: 700;
  letter-spacing: 0.5px;
}

.links {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 12px;
}

.link {
  color: white;
  text-decoration: none;
  opacity: 0.9;
}

.link:hover {
  opacity: 1;
  text-decoration: underline;
}

/* Vue Router dá aktívnej linke triedu "router-link-active" */
.router-link-active {
  font-weight: 700;
  text-decoration: underline;
}
</style>
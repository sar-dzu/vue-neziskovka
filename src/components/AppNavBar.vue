<template>
  <nav class="navbar">
  <div class="navbar-inner">
    <RouterLink to="/" class="brand">Mestáreň</RouterLink>

    <div class="nav-links">
      <RouterLink to="/" class="nav-link">Domov</RouterLink>
      <RouterLink to="/projects" class="nav-link">Projekty</RouterLink>
      <RouterLink to="/blog" class="nav-link">Blog</RouterLink>
      <RouterLink to="/people" class="nav-link">Náš tím</RouterLink>
      <RouterLink to="/about" class="nav-link">O nás</RouterLink>
      <RouterLink to="/admin" class="nav-link">Admin</RouterLink>
    </div>
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
  position: sticky;
  top: 0;
  z-index: 1000;

  background: var(--primary);
  box-shadow: var(--shadow);
}

.navbar-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 14px 16px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.brand {
  font-weight: 900;
  letter-spacing: -0.01em;
  color: white;
}

.nav-links {
  display: flex;
  gap: 6px;
  align-items: center;
}

.nav-link {
  color: rgba(255,255,255,0.88);
  padding: 8px 12px;
  border-radius: 999px;
  font-weight: 700;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.nav-link:hover {
  background: rgba(255,255,255,0.12);
  color: white;
}

.nav-link.router-link-active {
  background: rgba(255,255,255,0.20);
  color: white;
}
</style>
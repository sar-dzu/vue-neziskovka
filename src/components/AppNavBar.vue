<template>
  <header class="navbar">
    <div class="navbar-inner">
      <RouterLink to="/" class="brand">Mestáreň</RouterLink>

      <!-- desktop -->
      <nav class="nav-links desktop">
        <RouterLink to="/" class="nav-link">Domov</RouterLink>
        <RouterLink to="/projects" class="nav-link">Projekty</RouterLink>
        <RouterLink to="/blog" class="nav-link">Blog</RouterLink>
        <RouterLink to="/people" class="nav-link">Náš tím</RouterLink>
        <RouterLink to="/about" class="nav-link">O nás</RouterLink>
        <RouterLink to="/admin" class="nav-link admin-link">Admin</RouterLink>
      </nav>

      <!-- hamburger button -->
      <button class="burger mobile" @click="toggleMenu" aria-label="Open menu">
        ☰
      </button>
    </div>

    <!-- mobile menu -->
    <nav v-if="isOpen" class="mobile-menu mobile">
      <RouterLink to="/" class="mobile-link" @click="closeMenu">Domov</RouterLink>
      <RouterLink to="/projects" class="mobile-link" @click="closeMenu">Projekty</RouterLink>
      <RouterLink to="/blog" class="mobile-link" @click="closeMenu">Blog</RouterLink>
      <RouterLink to="/people" class="mobile-link" @click="closeMenu">Náš tím</RouterLink>
      <RouterLink to="/about" class="mobile-link" @click="closeMenu">O nás</RouterLink>
      <RouterLink to="/admin" class="mobile-link" @click="closeMenu">Admin</RouterLink>
    </nav>
  </header>
</template>

<script>
export default {
  name: "AppNavbar",
  data() {
    return { isOpen: false };
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
    closeMenu() {
      this.isOpen = false;
    },
  },
  watch: {
    $route() {
      this.isOpen = false;
    },
  },
};
</script>

<style scoped>
.navbar {
  background: var(--primary);
  box-shadow: var(--shadow);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.navbar-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 14px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.brand {
  color: white;
  font-weight: 900;
  letter-spacing: -0.02em;
  font-size: large;
}

.nav-links {
  display: flex;
  gap: 8px;
  align-items: center;
}

.nav-link {
  color: rgba(255,255,255,0.9);
  padding: 8px 12px;
  border-radius: 999px;
  font-weight: 800;
}

.nav-link:hover {
  background: rgba(255,255,255,0.12);
  color: #fff;
}

.nav-link.router-link-active {
  background: rgba(255,255,255,0.18);
  color: #fff;
}

.burger {
  border: 1px solid rgba(255,255,255,0.25);
  background: rgba(255,255,255,0.10);
  color: white;
  font-weight: 900;
  padding: 8px 12px;
  border-radius: 12px;
  cursor: pointer;
}

.mobile-menu {
  display: flex;
  flex-direction: column;
  max-width: 1100px;
  margin: 0 auto;
  padding: 10px 16px 16px;
  gap: 8px;
}

.mobile-link {
  display: block;
  width: fit-content;
  color: white;
  font-weight: 800;
  padding: 5px 10px;
  margin: 5px 5px;
  border-radius: 12px;
  background: rgba(255,255,255,0.10);
}

.mobile-link:hover {
  background: rgba(255,255,255,0.16);
}

/* responsive */
.desktop { display: none; }
.mobile { display: block; }

@media (min-width: 900px) {
  .desktop { display: flex; }
  .mobile { display: none; }
}
</style>
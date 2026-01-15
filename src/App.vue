<template>
  <AppNavbar />
  <RouterView />
</template>

<script>
import AppNavbar from "./components/AppNavBar.vue";

export default {
  name: "App",
  components: {
    AppNavbar,
  },
};
</script>
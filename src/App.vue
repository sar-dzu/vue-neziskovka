<template>
  <v-app>
    <AppNavbar />
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<script>
import AppNavbar from "./components/AppNavBar.vue";

export default {
  name: "App",
  components: { AppNavbar },
};
</script>
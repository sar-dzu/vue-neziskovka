<template>
  <v-app>
    <AppNavbar />
    <v-main>
      <RouterView />
      <AppFooter />
    </v-main>
  </v-app>
</template>

<script>
import AppNavbar from "./components/AppNavBar.vue";
import AppFooter from "./components/AppFooter.vue";

export default {
  name: "App",
  components: { AppNavbar, AppFooter },
};
</script>
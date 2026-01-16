<template>
  <v-app>
    <AppNavbar />
    <v-main>
      <RouterView />
    </v-main>
    <AppFooter />
  </v-app>
</template>

<script>
import AppNavbar from "./components/AppNavBar.vue";
import AppFooter from "./components/AppFooter.vue";

export default {
  name: "App",
  components: { AppNavbar, AppFooter },
  provide() {
      return {
      projectTagOptions: ["Vzdelávanie", "Komunita", "Pomoc", "Výskum", "Mládež", "Médiá"],
      projectStatusOptions: [
        { title: "Plánujeme", value: "planned" },
        { title: "V procese", value: "ongoing" },
        { title: "Dokončené", value: "finished" },],
        blogTagOptions: ["Aktivity", "Vzdelávanie", "Partnerstvá", "Výskum", "Médiá"],
    }
  }
};
</script>
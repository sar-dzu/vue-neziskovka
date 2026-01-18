<template>
  <v-app>
    <AppNavbar />
    <v-main>
      <RouterView />
    </v-main>
    <AppFooter />
    <v-snackbar
      v-model="ui.snackbar.show"
      :timeout="ui.snackbar.timeout"
      :color="ui.snackbar.color"
      location="bottom"
    >
      {{ ui.snackbar.text }}

      <template #actions>
        <v-btn variant="text" @click="ui.closeToast()">OK</v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import AppNavbar from "./components/AppNavBar.vue";
import AppFooter from "./components/AppFooter.vue";
import { useUiStore } from "./stores/ui";

export default {
  name: "App",
  components: { AppNavbar, AppFooter },
  data() {
    return {
      ui: useUiStore(),
    }
  },
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
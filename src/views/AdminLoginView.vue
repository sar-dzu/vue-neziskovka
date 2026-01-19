<template>
    
  <v-container>
    <SectionHeader title="Admin login" subtitle="Prihlásenie pre správcu." />
    
    <v-card max-width="760">
      <v-card-text>
        <v-form @submit.prevent="handleLogin">
          <v-text-field
            v-model="username"
            label="Meno používateľa"
            variant="outlined"
            density="comfortable"
          />

          <v-text-field
            v-model="password"
            label="Heslo"
            type="password"
            variant="outlined"
            density="comfortable"
          />

          <p v-if="authStore.loginError" class="text error">
            {{ authStore.loginError }}
          </p>

          <button type="submit" class="btn btn-primary">Prihlásiť sa</button>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
  
</template>

<script>
import SectionHeader from "../components/SectionHeader.vue";
import { useAuthStore } from "../stores/auth";

export default {
  name: "AdminLoginView",
  components: { SectionHeader },
  data() {
    return {
      authStore: useAuthStore(),
      username: "",
      password: "",
    };
  },
  methods: {
    handleLogin() {
      const ok = this.authStore.login(this.username, this.password);
      if (ok) this.$router.push("/admin");
    },
  },
};
</script>

<style scoped>
.error {
  color: #b00020;
  font-weight: 800;
  margin: 8px 0 12px;
}

</style>

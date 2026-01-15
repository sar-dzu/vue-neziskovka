<template>
  <main class="container">
    <SectionHeader title="Admin login" subtitle="Prihlásenie pre pridávanie článkov." />

    <form class="form" @submit.prevent="handleLogin">
      <label class="label">
        Username
        <input class="input" v-model="username" type="text" />
      </label>
      <label class="label">
        Password
        <input class="input" v-model="password" type="password" />
      </label>
      <p v-if="authStore.loginError" class="error">
        {{ authStore.loginError }}
      </p>

      <button class="btn" type="submit">Login</button>
    </form>
  </main>
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
      if (ok) {
        this.$router.push("/admin");
      }
    },
  },
};
</script>

<style scoped>
.form {
  max-width: 420px;
  display: grid;
  gap: 12px;
  margin-top: 16px;
}

.label {
  display: grid;
  gap: 6px;
  font-weight: 600;
}

.input {
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid rgba(0,0,0,0.15);
  font-size: 15px;
}

.btn {
  padding: 10px 12px;
  border-radius: 10px;
  border: none;
  background: #1E3A5F;
  color: white;
  font-weight: 700;
  cursor: pointer;
}

.btn:hover {
  opacity: 0.95;
}

.error {
  color: #b00020;
  font-weight: 700;
}
</style>

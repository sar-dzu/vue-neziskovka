import { defineStore } from "pinia";

export const useAuthStore = defineStore("authStore", {
  state: () => {
    return {
      isAdminLoggedIn: false,
      loginError: "",
    };
  },

  actions: {
    login(username, password) {
      const ok = username === "admin" && password === "heslo";

      if (ok) {
        this.isAdminLoggedIn = true;
        this.loginError = "";
        this.saveSession();
        return true;
      }
      this.isAdminLoggedIn = false;
      this.loginError = "Nesprávne meno alebo heslo.";
      return false;
    },

    logout() {
      this.isAdminLoggedIn = false;
      this.loginError = "";
      this.saveSession();
    },
    loadSession() {
        const raw = localStorage.getItem("adminLoggedIn");
        this.isAdminLoggedIn = raw === "true";
    },
    saveSession() {
        localStorage.setItem("adminLoggedIn", String(this.isAdminLoggedIn));
    },
  },
});

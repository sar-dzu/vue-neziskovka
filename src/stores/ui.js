import { defineStore } from "pinia";

export const useUiStore = defineStore("ui", {
  state: () => ({
    snackbar: {
      show: false,
      text: "",
      color: "success",
      timeout: 2500,
    },
  }),
  actions: {
    toast(text, color = "success", timeout = 2500) {
      this.snackbar.text = text;
      this.snackbar.color = color;
      this.snackbar.timeout = timeout;

      this.snackbar.show = false;
      setTimeout(() => {
        this.snackbar.show = true;
      }, 0);
    },
    closeToast() {
      this.snackbar.show = false;
    },
  },
});

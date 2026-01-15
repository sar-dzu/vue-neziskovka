<template>
  <main class="container">
    <SectionHeader
      title="About"
      subtitle="Toto je stránka o organizácii."
    />
  </main>
</template>

<script>
import SectionHeader from '@/components/SectionHeader.vue';

export default {
  name: "AboutView",
  components: {
    SectionHeader
  }
};
</script>

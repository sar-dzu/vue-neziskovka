<template>
  <main class="container">
    <SectionHeader 
    title="Domov"
    subtitle="Toto je domovská stránka."
    />
  </main>
</template>

<script>
import SectionHeader from '@/components/SectionHeader.vue';

export default {
  name: "HomeView",
  components: {
    SectionHeader
  }
};
</script>

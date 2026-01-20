<template>
  <main class="container stack">
    <SectionHeader title="Náš tím" subtitle="Ľudia, ktorí stoja za aktivitami organizácie." />

    <div class="grid">
      <PeopleCard
        v-for="p in peopleStore.people"
        :key="p.id"
        :name="p.name"
        :role="p.role"
        :bio="p.bio"
        :image="p.image"
      />
    </div>
  </main>
</template>

<script>
import SectionHeader from "../components/SectionHeader.vue";
import PeopleCard from "../components/PeopleCard.vue";
import { usePeopleStore } from "../stores/people";

export default {
  name: "PeopleView",
  components: { SectionHeader, PeopleCard },
  data() {
    return {
      peopleStore: usePeopleStore(),
    };
  },
};
</script>

<style scoped>
.grid {
  display: grid;
  gap: 16px;
}

@media (min-width: 900px) {
  .grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>

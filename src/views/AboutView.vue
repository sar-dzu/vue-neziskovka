<template>
  <main class="container stack">
    <SectionHeader
      title="O nás"
      subtitle="Sme nezisková organizácia, ktorá prepája ľudí, nápady a komunitu."
    />

    <section class="surface stack">
      <h2 class="h2">Naša misia</h2>
      <p class="text">
        Našim cieľom je zlepšovať kvalitu života v komunite cez aktivity, vzdelávanie a spoluprácu s partnermi.
        Organizujeme podujatia, workshopy a projekty, ktoré majú reálny dopad.
      </p>

      <h2 class="h2">Čo robíme</h2>
      <ul class="list">
        <li>Komunitné workshopy a vzdelávacie aktivity</li>
        <li>Spolupráce s miestnymi organizáciami a školami</li>
        <li>Dobrovoľnícke aktivity a kampane</li>
        <li>Informovanie verejnosti o aktivitách cez blog</li>
      </ul>

      <h2 class="h2">Hodnoty</h2>
      <div class="values">
        <div class="value">
          <h3 class="value-title">Otvorenosť</h3>
          <p class="text">Aktívne počúvame komunitu a zapájame ľudí do diania.</p>
        </div>
        <div class="value">
          <h3 class="value-title">Spolupráca</h3>
          <p class="text">Veríme v partnerstvá a férovú komunikáciu.</p>
        </div>
        <div class="value">
          <h3 class="value-title">Dopad</h3>
          <p class="text">Sústredíme sa na konkrétne výsledky a zmysluplné riešenia.</p>
        </div>
      </div>
    </section>

    <section class="surface stack">
      <h2 class="h2">Kontakt</h2>
      <p class="text">Email: info@neziskovka.sk</p>
      <p class="text">Telefón: +421 900 000 000</p>
      <p class="text">Adresa: xxx</p>
    </section>
  </main>
</template>

<script>
import SectionHeader from "../components/SectionHeader.vue";

export default {
  name: "AboutView",
  components: { SectionHeader },
};
</script>

<style scoped>
.list {
  margin-left: 18px;
  display: grid;
  gap: 8px;
}

.values {
  display: grid;
  gap: 12px;
}

.value {
  padding: 12px 14px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: rgba(0, 0, 0, 0.02);
}

.value-title {
  font-size: 14px;
  font-weight: 900;
  margin-bottom: 6px;
}
</style>

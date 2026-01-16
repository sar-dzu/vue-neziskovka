import { defineStore } from "pinia";


export const usePeopleStore = defineStore("peopleStore", {
  state: () => ({
    people: [
      {
        id: 1,
        name: "Meno Priezvisko",
        role: "Project manager",
        bio: "Krátky popis, 1–2 vety o človeku.",
        image: new URL("../assets/people/person1.png", import.meta.url).href
      },
      {
        id: 2,
        name: "Meno Priezvisko",
        role: "Komunikácia",
        bio: "Krátky popis, 1–2 vety o človeku.",
        image: new URL("../assets/people/person2.png", import.meta.url).href,
      },
      {
        id: 1,
        name: "Meno Priezvisko",
        role: "HR",
        bio: "Krátky popis, 1–2 vety o človeku.",
        image: new URL("../assets/people/person3.png", import.meta.url).href
      },
      {
        id: 1,
        name: "Meno Priezvisko",
        role: "Admin",
        bio: "Krátky popis, 1–2 vety o človeku.",
        image: new URL("../assets/people/person4.png", import.meta.url).href
      },
    ],
  }),
});

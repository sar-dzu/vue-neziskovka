<template>
  <article class="surface person">
    <div class="avatar-wrap">
      <img v-if="image" :src="image" :alt="name" class="avatar" />
      <div v-else class="avatar fallback">
        {{ initials }}
      </div>
    </div>

    <h3 class="name">{{ name }}</h3>
    <p class="role">{{ role }}</p>
    <p class="text bio">{{ bio }}</p>
  </article>
</template>
<script>
export default {
  name: "PeopleCard",
  props: {
    name: { type: String, required: true },
    role: { type: String, required: true },
    bio: { type: String, required: true },
    image: { type: String, default: "" },
  },
  computed: {
    initials() {
      return this.name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((w) => w[0].toUpperCase())
        .join("");
    },
  },
};
</script>

<style scoped>
.person {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 10px;
}

.avatar-wrap {
  margin-top: -40px;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--surface);
  box-shadow: var(--shadow);
}

.fallback {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-weight: 900;
  font-size: 22px;
  background: rgba(29, 60, 81, 0.08);
  color: var(--primary);
  border: 3px solid var(--surface);
  box-shadow: var(--shadow);
}

.person:hover .avatar,
.person:hover .fallback {
  transform: translateY(-2px);
}

.name {
  font-size: 18px;
  font-weight: 900;
  margin-top: 8px;
}

.role {
  font-size: 16px;
  font-weight: 800;
  color: var(--accent);
}

.bio {
  font-size: 14px;
}

</style>

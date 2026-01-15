<template>
    <header class="section-header">
        <h1 class="h1">
            {{ title }}
        </h1>
        <p v-if="subtitle" class="text">
            {{ subtitle }}
        </p>
    </header>
</template>

<script>
export default{
    name: "SectionHeader",
    props: {
        title: {
            type: String,
            required: true
        },
        subtitle: {
            type: String,
            default: ""
        }
    }
}
</script>

<style scoped>
.section-header {
  margin-bottom: 16px;
}
</style>
<template>
  <header class="header">
    <nav class="nav">
      <h1 class="logo">Services</h1>
      <ul class="nav-links">
        <li><NuxtLink to="/">Home</NuxtLink></li>
        <li><NuxtLink to="/pricing">Pricing</NuxtLink></li>
        <li><NuxtLink to="/book">Book Now</NuxtLink></li>
        <li><NuxtLink to="/faq">FAQ</NuxtLink></li>
      </ul>
      <input type="text" placeholder="Search" class="search-bar" />
    </nav>
  </header>
</template>
<script setup lang="ts">
const linksHub = ref([
  [{
   }],
  [
    {
      label: "Accueil",
      icon: "i-heroicons-home",
      to: "/",
    },
    {
      label: "Secteurs",
      icon: "i-heroicons-command-line",
      to: "/secteurs",
    },
    {
      label: "Créer une voie",
      icon: "i-heroicons-command-line",
      to: "/createVoie",
    },
  ],
  [
    {
      label: "",
    },
  ],
]);
</script>
<style scoped>
.header {
  width: 100%;
  position: absolute;
  background: transparent;
  font-weight: 600;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.nav {
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  background: transparent;
}
.nav-links {
  display: flex;
  gap: 55px;
}
.nav-links:nth-child(2n) {
  margin-left: 30px;
  margin: 5px;
  padding: 10px;
  border-radius: 4px;
  padding-left: 20px;
  padding-right: 20px;
}
.logo {
  padding: 10px;
  margin: 5px;
  border-radius: 4px;
}
.search-bar {
  padding: 5px;
  border: 1px solid #ccc;
}
</style>

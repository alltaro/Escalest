<template>
  <div>
    <UNavigationMenu highlight color="neutral" :orientation="orientation" :items="linksHub" class="w-full" />
  </div>
</template>
<script setup lang="ts">
import { useIsMobile } from "@/composables/useIsMobile";
const { isMobile } = useIsMobile();
const orientation = ref(isMobile.value ? "vertical" : "horizontal");

const linksHub = ref([
  [
    {
      label: "",
      icon: "material-symbols:menu",
    },
  ],
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

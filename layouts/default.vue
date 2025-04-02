<template>
  <div class="layout">
    <HeaderSection />
    <slot />
    <FooterSection />
  </div>
</template>

<script setup>
import HeaderSection from '~/components/HeaderSection.vue'
import FooterSection from '~/components/FooterSection.vue'
</script>

<style scoped>
.layout {
  font-family: Arial, sans-serif;
  color: #000;
}
</style>

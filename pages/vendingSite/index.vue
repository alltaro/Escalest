<template>
    <div class="homepage">
      <HomeIcon />
    </div>
  </template>
  
  <script setup>
  import HomeIcon from '../../components/HomeIcon.vue'
  useHead({
    title: 'Landing Page - Nuxt',
    meta: [{ name: 'description', content: 'Découvrez nos services de coiffure' }]
  })
  </script>
  
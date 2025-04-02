<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const isLoading = ref(true);
const route = useRoute();
const voieId = route.params.voieId;
const voie = ref({});
const images = ref<string[]>([]);

async function fetchVoie() {
  try {
    const response = await $fetch("/api/voies/getInformations", {
      method: "POST",
      body: { VoieId: voieId },
    });
    console.log(voie);
    if (response.success) {
      voie.value = response.voie;
      images.value = response.images; // Récupérer les images
    } else {
      console.error("Erreur lors de la récupération des voies", response.message);
    }
  } catch (error) {
    console.error("Erreur réseau :", error);
  }
  isLoading.value = false;
}

onMounted(() => {
  fetchVoie();
  console.log(voie);
});
</script>

<template>
  <main>
    <div v-if="isLoading">
      <p>Chargement...</p>
    </div>
    <div v-else>
      <h1>{{ voie.voieName }}</h1>
      <p><strong>Secteur :</strong> {{ voie.secteur?.nom }}</p>
      <p><strong>Description :</strong> {{ voie.voieDescription }}</p>
      <p><strong>Créée par :</strong> {{ voie.createdBy.username }}</p>

      <h2>Images de la voie</h2>
      <div v-if="images.length > 0">
        <img v-for="image in images" :src="image" :key="image" alt="Image de la voie" style="max-width: 300px; margin: 10px" />
      </div>
      <p v-else>Aucune image disponible pour cette voie.</p>
    </div>
  </main>
</template>

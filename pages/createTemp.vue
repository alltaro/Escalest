<template>
  <div>
    <h2>Créer une nouvelle voie</h2>
    <form @submit.prevent="submitVoie">
      <UInput v-model="voieName" placeholder="Nom de la voie" required />
      <USelect v-model="secteur" :options="secteursItems" placeholder="Secteur" required />
      <UTextarea v-model="voieDescription" placeholder="Description" required />
      <UInput v-model="createdBy" placeholder="Créé par" required />
      <input type="file" @change="handleFileUpload" />
      <UButton type="submit">Ajouter</UButton>
    </form>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useFetch } from '#app';

const voieName = ref('');
const secteur = ref(null);
const voieDescription = ref('');
const createdBy = ref('');
const file = ref(null);
const message = ref('');

const secteursItems = ref([
  { label: "Secteur A", value: "67c35fef6155303355c0e4e8" },
  { label: "Secteur B", value: "67c399a35ed5ae243f4e84dc" }
]);

const handleFileUpload = (event) => {
  file.value = event.target.files[0];
};

const submitVoie = async () => {
  const formData = new FormData();
  formData.append('voieName', voieName.value);
  formData.append('secteur', secteur.value);
  formData.append('voieDescription', voieDescription.value);
  formData.append('createdBy', createdBy.value);
  if (file.value) {
    formData.append('image', file.value);
  }

  const { data, error } = await useFetch('/api/add', {
    method: 'POST',
    body: formData,
  });

  if (error.value) {
    message.value = "Erreur : " + error.value.data.message;
  } else {
    message.value = "Voie ajoutée avec succès !";
  }
};
</script>

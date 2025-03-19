<script setup lang="ts">
import { ref } from 'vue';

const nom = ref('');
const secteur = ref('');
const description = ref('');
const files = ref<File[]>([]); // Stocker plusieurs fichiers
const isLoading = ref(false);

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files) {
    files.value = Array.from(input.files); // Convertir FileList en tableau
  }
};

const uploadFile = async () => {
  if (files.value.length === 0) return alert("Veuillez sélectionner au moins une image");

  const formData = new FormData();
  files.value.forEach(file => {
    formData.append('images', file); // Plusieurs fichiers sous le même champ
  });

  formData.append('nom', nom.value);
  formData.append('secteur', secteur.value);
  formData.append('description', description.value);

  isLoading.value = true;
  try {
    const response = await fetch('/api/voies/add', {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken") || ""}` // Ajouter l'authentification
      }
    });

    const data = await response.json();
    if (response.ok) {
      alert('Voie ajoutée avec succès !');
      nom.value = '';
      secteur.value = '';
      description.value = '';
      files.value = [];
    } else {
      alert(data.message || "Une erreur est survenue");
    }
  } catch (error) {
    console.error(error);
    alert("Erreur lors de l'ajout de la voie");
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-lg font-bold mb-4">Créer une nouvelle voie</h2>
    <form @submit.prevent="uploadFile">
      <input v-model="nom" type="text" placeholder="Nom de la voie" class="block w-full p-2 border mb-2" required />
      <input v-model="secteur" type="text" placeholder="Secteur" class="block w-full p-2 border mb-2" required />
      <textarea v-model="description" placeholder="Description" class="block w-full p-2 border mb-2"
        required></textarea>
      <input type="file" multiple @change="handleFileChange" class="block w-full p-2 border mb-2" />
      <button :disabled="isLoading" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        {{ isLoading ? "Envoi en cours..." : "Créer la voie" }}
      </button>
    </form>
  </div>
</template>

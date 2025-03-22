<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const toast = useToast();
const routeForm = ref({
  name: "",
  sectorId: null,
  description: "",
  difficultyRatings: 0,
  ratings: 0,
  files: [] as File[],
});

const sectors = ref<{ id: string; name: string }[]>([]); // Liste des secteurs
const isLoading = ref(false);

// Charger les secteurs
async function fetchSectors() {
  const response = await $fetch("/api/secteurs/getSecteurs");
  if (response.success) {
    sectors.value = response.secteurs;
  } else {
    toast.add({
      title: "Erreur",
      description: "Impossible de récupérer les secteurs.",
      color: "red",
    });
  }
}

// Fonction pour ajouter la voie
async function addRoute() {
  if (routeForm.value.files.length === 0) {
    return toast.add({
      title: "Erreur",
      description: "Veuillez sélectionner des fichiers image.",
      color: "red",
    });
  }

  const formData = new FormData();
  routeForm.value.files.forEach((file) => {
    formData.append("images", file); // Ajouter les images
  });

  formData.append("name", routeForm.value.name);
  formData.append("sectorId", routeForm.value.sectorId || ""); // Utiliser sectorId
  formData.append("description", routeForm.value.description);
  formData.append("difficultyRatings", routeForm.value.difficultyRatings);

  const token = useCookie("authToken").value;

  try {
    isLoading.value = true;
    const response = await $fetch("/api/voies/add", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.success) {
      toast.add({
        title: "Succès",
        description: "Voie ajoutée !",
        color: "green",
      });
      routeForm.value = {
        name: "",
        sectorId: null,
        description: "",
        difficultyRatings: 0,
        ratings: 0,
        files: [],
      };
    } else {
      toast.add({
        title: "Erreur",
        description: response.message,
        color: "red",
      });
    }
  } catch (error) {
    console.error("Erreur lors de l'ajout de la voie", error);
    toast.add({
      title: "Erreur",
      description: "Une erreur est survenue lors de l'ajout.",
      color: "red",
    });
  } finally {
    isLoading.value = false;
  }
}

// Gérer la sélection des fichiers
const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files) {
    routeForm.value.files = Array.from(input.files);
  }
};

const difficulties = () => {
  let diff = [];
  const step = ["a", "b", "c"];
  const stept = ["", "+"];
  for (let x = 3; x <= 9; x++) {
    for (let y = 0; y < 3; y++) {
      for (let z = 0; z < 2; z++) {
        diff.push(x + step[y] + stept[z]);
      }
    }
  }
  return diff;
};

// Charger les secteurs lors du montage du composant
const ListItems = difficulties();
onMounted(fetchSectors);
</script>
<template>
  <main style="align-items: center">
    <UForm :state="routeForm" class="w-1/2" style="align-self: center">
      <UFormGroup label="Nom de la voie" name="name" class="mb-3" required>
        <UInput v-model="routeForm.name" placeholder="Nom de la voie" />
      </UFormGroup>

      <UFormGroup label="Secteur" name="sectorId" class="mb-3" required>
        <USelectMenu v-model="routeForm.sectorId" :options="sectors.map((s) => ({ value: s._id, label: s.nom }))" searchable placeholder="serveur" />
      </UFormGroup>

      <UFormGroup label="Difficulté estimée" name="difficultyRatings" class="mb-3">
        <USelectMenu v-model="routeForm.difficultyRatings" :options="ListItems" placeholder="Difficulté estimée" searchable />
      </UFormGroup>

      <UFormGroup label="Description" name="description" class="mb-3">
        <UTextarea v-model="routeForm.description" placeholder="Description de la voie" />
      </UFormGroup>

      <UFormGroup label="Images" name="image" class="mb-3">
        <input type="file" multiple @change="handleFileChange" class="block w-full p-2 border mb-2" />
      </UFormGroup>

      <UButton @click="addRoute" :disabled="isLoading" class="mt-3" color="primary">
        {{ isLoading ? "Envoi en cours..." : "Créer la voie" }}
      </UButton>
    </UForm>
  </main>
</template>

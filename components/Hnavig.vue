<template>
  <div>
    <!-- Barre de navigation -->
    <UHorizontalNavigation :links="linksHub" class="border-b border-gray-200 dark:border-gray-800">
      <template #default="{ link }">
        <colorMod v-if="link.Num == 1" />
        <span class="group-hover:text-primary relative">{{ link.label }}</span>
      </template>
    </UHorizontalNavigation>

    <!-- Barre de recherche des secteurs -->
    <div v-if="isIndexPage" class="hidden md:flex justify-center items-center py-3">
      <div class="flex w-1/2">
        <!-- Champ de recherche -->
        <USelectMenu v-model="searchQuery" :options="secteurs" by="name" placeholder="Rechercher un secteur..." icon="i-heroicons-search" class="flex-1"> </USelectMenu>

        <!-- Bouton "Accéder" -->
        <UButton @click="handleAcceder" class="ml-2" icon="i-heroicons-arrow-right" variant="solid"> Accéder </UButton>
      </div>
    </div>
    <UModal v-model="AuthH">
      <auth />
    </UModal>
  </div>
</template>

<script setup>
let linksHub = (ref < Map) | (null > null);
const AuthH = ref(false);

import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useFetch } from "#app";

const route = useRoute();
const isIndexPage = computed(() => route.path === "/");
// Instance du router
const router = useRouter();
const token = useCookie("authToken").value;
console.log(`token : ${token}`);
// Navigation
linksHub = ref([
  [
    {
      Num: "0",
      label: "Accueil",
      icon: "i-heroicons-home",
      to: "/",
    },
    {
      Num: "0",
      label: "Secteurs",
      icon: "i-heroicons-command-line",
      to: "/secteurs",
    },
    {
      Num: "0",
      label: "Créer une voie",
      icon: "i-heroicons-command-line",
      to: "/createVoie",
    },
  ],
  [
    {
      label: "",
      Num: "1",
    },

    token
      ? { 
          label: "Connecté",
          to: "/profil",
        }
      : {
          label: "Se connecter",
          click: () => {
            AuthH.value = true;
          },
        },
  ],
]);

// Recherche des secteurs
const searchQuery = ref("");
const secteurs = ref([]);

// Fonction pour récupérer les secteurs
const Get = async () => {
  try {
    const response = await $fetch("/api/secteurs/getSecteurs", {
      method: "GET",
    });

    console.log("Réponse API :", response);

    if (response.success) {
      secteurs.value = response.secteurs.map((secteur) => ({
        label: secteur.nom.trim(), // Nom du secteur affiché
        value: secteur.nom.trim(), // ID utilisé pour la navigation
      }));
      console.log("Secteurs stockés :", secteurs.value); // DEBUG
    } else {
      toast.add({
        title: "Erreur",
        description: "Erreur lors de la récupération des secteurs",
        color: "red",
      });
    }
  } catch (error) {
    console.error("Erreur :", error);
    toast.add({
      title: "Erreur",
      description: "Une erreur est survenue lors de la récupération des secteurs",
      color: "red",
    });
  }
};

// Fonction pour naviguer vers un secteur spécifique
const navigateToSecteur = (name) => {
  console.log("Naviguer vers le secteur:", name);
  router.push(`/secteurs/${name}`); // Utilisation du nom pour la navigation
  searchQuery.value = ""; // Réinitialisation après la navigation
};

// Fonction pour accéder directement au secteur sélectionné via le bouton "Accéder"
const handleAcceder = () => {
  console.log(searchQuery.value.label);
  navigateToSecteur(searchQuery.value.label); // Naviguer vers le secteur
};

// Charger les secteurs au montage
onMounted(async () => {
  Get();
  console.log(secteurs.value);
});
</script>

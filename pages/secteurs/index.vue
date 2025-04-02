<template>
  <div>
    <div class="flex behind w2/3">
      <!-- Champ de recherche -->
      <UInputMenu v-model="searchQuery" :options="secteurs" by="name" placeholder="Rechercher un secteur..." icon="i-heroicons-search" class="flex-1"> </UInputMenu>

      <!-- Bouton "Accéder" -->
      <UButton @click="handleAcceder" class="ml-2" icon="i-heroicons-arrow-right" variant="solid"> Accéder </UButton>
    </div>
    <div class="list">
      <h3>Liste des secteurs</h3>
      <div class="sector-list">
        <div v-for="sector in sectors" :key="sector.id" class="sector-card" @click="goToSectorPage(sector.nom)">
          <h4>Nom : {{ sector.nom }}</h4>
          <p>Description: {{ sector.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

// Liste des secteurs
const sectors = ref([]);
const searchQuery = ref("");
const secteurs = ref([]);
// Router pour la navigation
const router = useRouter();

const navigateToSecteur = (name) => {
  console.log("Naviguer vers le secteur:", name);
  router.push(`/secteurs/${name}`); // Utilisation du nom pour la navigation
  searchQuery.value = ""; // Réinitialisation après la navigation
};

const handleAcceder = () => {
  console.log(searchQuery.value.label);
  navigateToSecteur(searchQuery.value.label); // Naviguer vers le secteur
};

// Fonction pour récupérer les secteurs depuis l'API
async function fetchSectors() {
  try {
    const response = await $fetch("/api/secteurs/getSecteurs");
    if (response.success) {
      sectors.value = response.secteurs; // Stocke les secteurs
      secteurs.value = response.secteurs.map((secteur) => ({
        label: secteur.nom.trim(), // Nom du secteur affiché
        value: secteur.nom.trim(), // ID utilisé pour la navigation
      }));
    } else {
      toast.add({
        title: "Erreur",
        description: "Impossible de récupérer les secteurs.",
        color: "red",
      });
    }
  } catch (error) {
    console.error("Erreur de récupération des secteurs:", error);
  }
}

// Fonction pour naviguer vers la page du secteur
const goToSectorPage = (name) => {
  router.push(`/secteurs/${name}`);
};

// Récupérer les secteurs au montage du composant

fetchSectors();
console.log(secteurs.value);
</script>

<style scoped>
.list {
  margin-top: 20px;
  margin-inline: 10px;
}

.sector-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

/* Cartes en grille sur PC, pleine largeur sur mobile */
.sector-card {
  width: 200px;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  transition: box-shadow 0.2s;
  color: whitesmoke;
  background: #333;
  text-align: center;
}

@media (min-width: 768px) {
}

/* Responsive : pleine largeur sur mobile */
@media (max-width: 768px) {
  .sector-card {
    width: 100%;
  }
}

.sector-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>

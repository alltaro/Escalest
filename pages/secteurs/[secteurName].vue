<template>
    <main>
        <div v-if="isLoading">
            <p>Chargement...</p>
        </div>
        <div v-else>
            <h1>Voies dans le secteur : {{ secteurName }}</h1>
            <div v-if="voies.length === 0">
                <p>Aucune voie trouvée pour ce secteur.</p>
            </div>
            <ul v-else>
                <li v-for="voie in voies" :key="voie._id">
                    <router-link :to="`/voies/${voie._id}`">{{ voie.voieName }} description : {{ voie.voieDescription }}</router-link>
                </li>
            </ul>
        </div>
    </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const secteurName = route.params.secteurName;  // Récupère le nom du secteur depuis l'URL

const voies = ref<any[]>([]);
const isLoading = ref(true);

// Fonction pour récupérer les voies en fonction du secteur
async function fetchVoiesBySecteur() {
    try {
        console.log(secteurName)
        // Envoyer une requête POST avec le nom du secteur dans le corps de la requête
        const response = await $fetch('/api/secteurs/listVoies', {
            method: 'POST',
            body: { secteurName },
        });

        if (response.success) {
            voies.value = response.voies;
        } else {
            console.error('Erreur lors de la récupération des voies', response.message);
        }
    } catch (error) {
        console.error('Erreur réseau :', error);
    } finally {
        isLoading.value = false;
    }
}

onMounted(() => {
    fetchVoiesBySecteur();
});
</script>

<style scoped>
/* Tu peux ajouter du style ici pour ta page */
h1 {
    font-size: 2rem;
    margin-bottom: 20px;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    margin-bottom: 10px;
}
</style>

<script setup>
import { ref } from 'vue';

// État pour la recherche
const searchQuery = ref("");

// Émettre un événement pour fermer le composant quand on clique en dehors
const emit = defineEmits(["close"]);

// Fermer la recherche si on clique en dehors de la barre
const closeOnClickOutside = (event) => {
    if (event.target.classList.contains("overlay")) {
        emit("close");
    }
};
</script>

<template>
    <div class="overlay" @click="closeOnClickOutside">
        <div class="search-box">
            <input 
                type="text" 
                v-model="searchQuery" 
                placeholder="Rechercher un secteur..."
                class="search-input"
            />
        </div>
    </div>
</template>

<style scoped>
/* Fond gris semi-transparent */
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: flex-end;
    justify-content: center;
}

/* Barre de recherche centrée aux 3/4 de l'écran */
.search-box {
    width: 90%;
    height: 25%;
    background: white;
    border-radius: 12px 12px 0 0;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* Input large */
.search-input {
    width: 100%;
    padding: 0.8rem;
    font-size: 1.2rem;
    border: none;
    outline: none;
    border-radius: 8px;
    background: #f3f3f3;
}
</style>

<template>
    <div>
        <header class=" top-bar fixed top-0 left-0 w-full bg-gray-900 text-white p-4">
            <button @click="toggleSidebar" class="text-xl">☰</button>
            <span class="ml-4 squircle title">Site</span>
            <button @click='goToServeurs' class="search-btn">Rechercher un secteur</button>
        </header>

        <aside v-if="sidebarOpen" class="sidebar fixed inset-y-0 left-0 w-64 bg-gray-800 text-white p-4">
            <button @click="toggleSidebar" class="mb-4">✖</button>
            <div>
                <button v-if="!token" @click="showAuth" id="connectButton">Se connecter</button>
            </div>
            <ul>
                <li v-for="(link, index) in links" :key="index">
                    <NuxtLink :to="link.to">{{ link.text }}</NuxtLink>
                </li>
            </ul>
        </aside>
        <UModal v-model="AuthH">
            <auth />
        </UModal>
        <main class="mt-16 p-4">
            <slot />
        </main>
    </div>
</template>

<script setup>
const AuthH = ref(false)
const token = useCookie("authToken").value;
const links = [
    { text: 'Accueil', to: '/' },
    { text: 'Spécificités', to: '/Specs' },
    { text: 'Produits', to: '/Products' }
];
const connectionButton =
    token
        ? {
            text: "Connecté",
            to: "/profil",
        }
        : {
            text: "Se connecter",
            click: () => {
                AuthH.value = true;
            },
        }
const showAuth = () => {
    AuthH.value = true;
}
const sidebarOpen = ref(false);
const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value;
};
const goToServeurs = () => {
    navigateTo("/secteurs")
}



</script>

<style scoped>
.sidebar {
    z-index: 10;
}

.top-bar {
    justify-content: space-between;
    padding: 0 1rem;
    height: 50px;
    display: flex;
    width: 100%;
    align-items: center;
}

.search-btn {
    background: rgb(94, 218, 94);
    border: none;
    padding: 5px;
    border-radius: 8px;
    color: black;
    font-size: 1rem;
    cursor: pointer;
}

.title {
    background-color: aliceblue;
    color: black;
    padding: 6px;
    padding-left: 14px;
    padding-right: 14px;
}

.squircle {
    border-radius: 28% 28% 28% 28%;
}

#connectButton {
    background-color: white;
    color: rgb(221, 147, 36);
    border-radius: 5px;
    padding: 5px;
}

/* Ajoute des styles pour le menu */
</style>

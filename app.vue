<script setup lang="ts">
import type { H3Error } from "h3";

const toast = useToast();
const router = useRouter();
const { modal } = useAuthModal();
const sectors = ref<{ id: string; name: string }[]>([]); // Liste des secteurs

const route = useRoute();
import { useIsMobile } from "@/composables/useIsMobile";
const { isMobile } = useIsMobile();

// Sélection dynamique du layout
//const layout = computed(() => {
//if (route.path.startsWith("/vendingSite")) {
//return "default";
//}
//return isMobile.value ? "mobile" : "public";
//});
const layout = "public";
</script>

<template>
  <html>
    <Body>
      <NuxtLayout :name="layout">
        <NuxtPage />
      </NuxtLayout>
    </Body>
    <UNotifications />
  </html>
</template>

<style>
span[class^="i-"] {
  background-size: contain;
  background-position: center;
}
</style>

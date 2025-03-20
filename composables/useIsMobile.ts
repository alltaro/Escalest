import { ref, onMounted, onUnmounted } from "vue";

export function useIsMobile() {
  const isMobile = ref(false);

  const checkScreenSize = () => {
    isMobile.value = window.innerWidth <= 768; // Définit une largeur max pour mobile
  };

  onMounted(() => {
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", checkScreenSize);
  });

  return { isMobile };
}

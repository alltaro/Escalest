import { writeFile, mkdir, readdir } from "fs/promises";
import { join } from "path";

export async function uploadImage(file: Buffer, voieId: string) {
  const dirPath = join("./public/uploads", voieId);

  // Vérifie si le dossier existe, sinon le crée
  await mkdir(dirPath, { recursive: true });

  const fileName = `${Date.now()}.jpg`; // Nom unique pour éviter les conflits
  const filePath = join(dirPath, fileName);

  await writeFile(filePath, file);
  return `/uploads/${voieId}/${fileName}`; // URL de l'image
}

// Fonction pour récupérer toutes les images d'une voie
export async function getImagesForVoie(voieId: string) {
  const dirPath = join("./public/uploads", voieId);
  try {
    const files = await readdir(dirPath);
    return files.map((file) => `/uploads/${voieId}/${file}`);
  } catch (error) {
    console.error("Erreur lors de la récupération des images :", error);
    return []; // Retourne une liste vide si aucune image n'est trouvée
  }
}

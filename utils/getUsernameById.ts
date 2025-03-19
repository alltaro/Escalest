import User from "../models/User";  // Assure-toi d'importer ton modèle User
import connectToDB from "./db"

/**
 * Fonction utilitaire pour récupérer le username d'un utilisateur par son ID.
 * @param userId - L'ID de l'utilisateur à rechercher.
 * @returns Le username de l'utilisateur ou null si l'utilisateur n'est pas trouvé.
 */
export async function getUsernameById(userId: string): Promise<string | null> {
 await connectToDB()
  try {
    // Recherche de l'utilisateur dans la base de données par son ID
    const user = await User.findById(userId).select("username");  // On ne récupère que le champ "username"

    // Si l'utilisateur est trouvé, on retourne son username
    if (user) {
      return user.username;
    }

    // Si l'utilisateur n'est pas trouvé, on retourne null
    return null;
  } catch (error) {
    console.error("Erreur lors de la récupération du username : ", error);
    return null;  // Si une erreur se produit, on retourne null
  }
}

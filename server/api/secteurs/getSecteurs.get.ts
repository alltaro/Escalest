import { defineEventHandler } from "h3";
import Secteur from "../../../models/Secteurs";
import dbConnect from "../../../utils/db";

export default defineEventHandler(async () => {
  await dbConnect(); // Connexion à la base de données

  try {
    const secteurs = await Secteur.find(); // Récupérer tous les secteurs
    return { success: true, secteurs };
  } catch (error) {
    return { success: false, message: "Erreur lors de la récupération des secteurs", error };
  }
});

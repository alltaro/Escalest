import { defineEventHandler, getQuery } from 'h3'; // h3 helpers
import dbConnect from '../../../utils/db'; // Connexion à la base de données
import Voie from '../../../models/Voies'; // Modèle de la collection Voies
import Secteur from '../../../models/Secteurs'; // Modèle de la collection Secteurs

export default defineEventHandler(async (event) => {
  // Connexion à la base de données
  await dbConnect();

  // Récupération du nom du secteur depuis la requête
  const body = await readBody(event);
  const { secteurName } = body; // Récupérer le nom du secteur depuis le corps de la requête
  console.log('secteur:')
  console.log(secteurName)
  if (!secteurName) {
    return { success: false, message: "Secteur non spécifié" };
  }

  try {
    // Trouver le secteur par son nom
    const secteur = await Secteur.findOne({ nom: secteurName });

    if (!secteur) {
      return { success: false, message: "Secteur introuvable" };
    }

    // Récupérer toutes les voies associées au secteur
    const voies = await Voie.find({ secteur: secteur._id }).populate('secteur'); // .populate('secteur') si tu veux des détails sur le secteur associé

    return { success: true, voies };

  } catch (error) {
    console.error(error);
    return { success: false, message: "Erreur lors de la récupération des voies", error };
  }
});

import { defineEventHandler, readBody } from 'h3'; 
import dbConnect from '../../../utils/db';
import Voie from '../../../models/Voies';
import User from '~/models/User';
import { getImagesForVoie } from '~/utils/upload';

export default defineEventHandler(async (event) => {
  await dbConnect();

  const body = await readBody(event);
  const { VoieId } = body;
  if (!VoieId) {
    return { success: false, message: "Voie non spécifiée" };
  }

  try {
    let voie = await Voie.findOne({ _id: VoieId }).populate('secteur');
    if (!voie) {
      return { success: false, message: "Voie non trouvée" };
    }

    // Récupérer l'utilisateur qui a créé la voie
    const user = await User.findOne({ _id: voie.createdBy });
    voie.createdBy = user ? user.username : "Utilisateur inconnu";

    // Récupérer les images de la voie
    const images = await getImagesForVoie(VoieId);

    return { success: true, voie, images };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Erreur lors de la récupération des voies", error };
  }
});

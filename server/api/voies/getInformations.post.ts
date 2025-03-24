import { defineEventHandler, readBody } from "h3";
import dbConnect from "../../../utils/db";
import Voie from "../../../models/Voies";
import User from "~/models/User";
import { getImagesForVoie } from "~/utils/upload";

export default defineEventHandler(async (event) => {
  await dbConnect();

  const body = await readBody(event);
  const { VoieId } = body;
  if (!VoieId) {
    return { success: false, message: "Voie non spécifiée" };
  }

  try {
    // Peupler à la fois "secteur" et "createdBy"
    let voie = await Voie.findOne({ _id: VoieId })
      .populate("secteur") // Peupler le champ secteur
      .populate("createdBy"); // Peupler le champ createdBy (utilisateur)

    if (!voie) {
      return { success: false, message: "Voie non trouvée" };
    }

    // Ne conserver que le "username" de l'utilisateur dans createdBy
    voie.createdBy = { username: voie.createdBy.username, _id: voie.createdBy._id };

    // Récupérer les images de la voie
    const images = await getImagesForVoie(VoieId);

    return { success: true, voie, images };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Erreur lors de la récupération des voies", error };
  }
});

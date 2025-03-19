import { defineEventHandler, readMultipartFormData } from "h3";
import connectToDB from "../../../utils/db";
import Voie from "../../../models/Voies";
import { uploadImage } from "../../../utils/upload";
import mongoose from "mongoose"; // Importer mongoose pour utiliser ObjectId
import { verifyJWT } from "~/utils/jwt";

export default defineEventHandler(async (event) => {
  await connectToDB();

  // Lire les données multipart
  const formData = await readMultipartFormData(event);
  console.log(formData); // Debug: Afficher le contenu de formData

  // Extraire le token JWT du header Authorization
  const token = getHeader(event, "authorization")?.replace("Bearer ", "");
  if (!token) {
    return { success: false, message: "Token d'authentification manquant" };
  }

  if (!formData) {
    return { success: false, message: "Données invalides" };
  }

  // Décoder le token JWT pour récupérer l'ID de l'utilisateur
  let userId;
  try {
    const decoded = verifyJWT(token); 
    userId = decoded.id; 
  } catch (err) {
    return { success: false, message: "Token invalide ou expiré" };
  }
  const createdBy = new mongoose.Types.ObjectId(userId);

  const voieName = formData.find((item) => item.name === "voieName")?.data.toString();
  const secteur = formData.find((item) => item.name === "secteur")?.data.toString();
  const voieDescription = formData.find((item) => item.name === "voieDescription")?.data.toString();
  const file = formData.find((item) => item.name === "image")?.data;

  console.log('Form Data:', { voieName, secteur, voieDescription, createdBy, file });

  if (!voieName || !secteur || !voieDescription || !createdBy) {
    return { success: false, message: "Tous les champs sont requis" };
  }

  try {
    const newVoie = new Voie({
      voieName,
      secteur,
      voieDescription,
      createdBy,
      difficultyRatings: [],
      completedBy: [],
      imageUrl: null, // On mettra à jour après l'upload
    });

    await newVoie.save();

    // Upload de l'image après création pour récupérer l'ID de la voie
    if (file) {
      const imageUrl = await uploadImage(file, newVoie._id.toString());
      newVoie.imageUrl = imageUrl;
      await newVoie.save();
    }

    return { success: true, message: "Voie créée avec succès", voie: newVoie };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Erreur lors de la création", error };
  }
});

import { defineEventHandler, readMultipartFormData } from "h3";
import connectToDB from "../../../utils/db";
import Voie from "../../../models/Voies";
import { uploadImage } from "../../../utils/upload";
import mongoose from "mongoose"; 
import { verifyJWT } from "~/utils/jwt";

export default defineEventHandler(async (event) => { 
  await connectToDB();

  const formData = await readMultipartFormData(event);
  console.log(formData); // Debug

  const token = getHeader(event, "authorization")?.replace("Bearer ", "");
  if (!token || token == "") {
    return { success: false, message: "Token d'authentification manquant" };
  }
  console.log("token : "+token)
  if (!formData) {
    return { success: false, message: "Données invalides" };
  }

  let userId;
  try {
    const decoded = verifyJWT(token); 
    userId = decoded.id; 
    console.log("userId : "+decoded )
    console.log(decoded)
  } catch (err) {
    return { success: false, message: "Token invalide ou expiré" };
  }

  const createdBy = new mongoose.Types.ObjectId(userId);
  console.log("createdBy : " +createdBy)
  const voieName = formData.find((item) => item.name === "name")?.data.toString();
  const secteurId = formData.find((item) => item.name === "sectorId")?.data.toString();
  const voieDescription = formData.find((item) => item.name === "description")?.data.toString();
  const difficultyRatings = [formData.find((item) => item.name === "difficultyRatings")?.data.toString()];
  const file = formData.find((item) => item.name === "images")?.data;

  console.log('Form Data:', { voieName, secteurId, voieDescription, createdBy, file });

  if (!voieName || !secteurId || !voieDescription || !createdBy ) {
    return { success: false, message: "Tous les champs sont requis" };
  }

  try {
    const newVoie = new Voie({
      voieName,
      secteur: new mongoose.Types.ObjectId(secteurId), // Utilisation de l'ID du secteur
      voieDescription,
      createdBy,
      difficultyRatings,
      completedBy: [],
      imageUrl: null,
    });

    await newVoie.save();

    if (file) {
      console.log("file upload")
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

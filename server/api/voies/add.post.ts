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
  console.log("token : " + token);
  if (!formData) {
    return { success: false, message: "Données invalides" };
  }

  let userId;
  try {
    const decoded = verifyJWT(token);
    userId = decoded.id;
    console.log("userId : " + decoded);
    console.log(decoded);
  } catch (err) {
    return { success: false, message: "Token invalide ou expiré" };
  }

  const createdBy = new mongoose.Types.ObjectId(userId);
  console.log("createdBy : " + createdBy);
  const voieName = formData.find((item) => item.name === "name")?.data.toString();
  const secteurIdString = formData.find((item) => item.name === "sectorId")?.data.toString();
  const voieDescription = formData.find((item) => item.name === "description")?.data.toString();
  console.log("step1");
  console.log("secteurIdString :");
  console.log(secteurIdString);
  // Récupérer et convertir difficultyRatings en nombre unique
  const difficultyRatingsString = formData.find((item) => item.name === "difficultyRatings")?.data.toString();
  const difficultyRatingsNumber = difficultyRatingsString ? parseInt(difficultyRatingsString.trim(), 10) : 0;
  const secteurId = mongoose.Types.ObjectId.isValid(secteurIdString) ? new mongoose.Types.ObjectId(secteurIdString) : null;
  console.log("diff :" + difficultyRatingsNumber);
  // Si secteurId est invalide, retourner une erreur
  if (!secteurId) {
    return { success: false, message: "Secteur ID invalide" };
  }
  // Créer un tableau avec un seul élément, la valeur de difficultyRatings
  const difficultyRatings = difficultyRatingsNumber > 0 ? [difficultyRatingsNumber] : [];

  console.log("step2");

  const file = formData.find((item) => item.name === "images")?.data;
  console.log("Form Data:", { voieName, secteurId, voieDescription, createdBy, file, difficultyRatings });

  if (!voieName || !secteurId || !voieDescription || !createdBy || difficultyRatings.length === 0) {
    return { success: false, message: "Tous les champs sont requis" };
  }

  try {
    const newVoie = new Voie({
      voieName,
      secteur: secteurId, // Utilisation de l'ID du secteur comme ObjectId
      voieDescription,
      createdBy,
      difficultyRatings, // Ajouter le tableau contenant la note
      completedBy: [],
      imageUrl: null,
    });
    console.log(newVoie);
    console.log("step3");
    await newVoie.save();
    console.log("step4");

    if (file) {
      console.log("file upload");
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

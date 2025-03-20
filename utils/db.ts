import mongoose from "mongoose";

const MONGO_URI = "mongodb+srv://alttaro:YwIcvjVaWiQgttiC@escalade.aacyi.mongodb.net/Escalade?retryWrites=true&w=majority&appName=Escalade"; // Mets ton URI MongoDB ici

const connectToDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return; // Déjà connecté
  }
  
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connecté à MongoDB");
  } catch (error) {
    console.error("Erreur de connexion à MongoDB:", error);
    throw error;
  }
};

export default connectToDB;

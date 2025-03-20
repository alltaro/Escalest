import mongoose from "mongoose";
import Secteur from "../models/Secteurs";
import User from "../models/User";
import Voie from "../models/Voies";

// 🔹 Charger l'URI MongoDB depuis `.env`
const MONGO_URI = "mongodb+srv://alttaro:YwIcvjVaWiQgttiC@escalade.aacyi.mongodb.net/Escalade?retryWrites=true&w=majority&appName=Escalade";

// 🔹 Fonction d'initialisation de la DB
const initDB = async () => {
  try {
    console.log("🔄 Connexion à MongoDB...");
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    console.log("✅ Connecté à MongoDB.");

    // Vérifier et insérer des données de test
    const secteurExist = await Secteur.findOne();
    if (!secteurExist) {
      console.log("📌 Ajout de données de test...");

      const secteur = await Secteur.create({ nom: "Secteur Test", description: "Un secteur d'escalade" });
      const user = await User.create({ username: "Admin", email: "admin@mail.com", password: "password123" });

      await Voie.create({
        voieName: "Voie Test",
        secteur: secteur._id,
        voieDescription: "Une belle voie d'escalade.",
        createdBy: user._id,
        difficultyRatings: [3, 4],
        completedBy: [user._id],
      });

      console.log("✅ Données de test ajoutées !");
    } else {
      console.log("⚡ La base de données est déjà initialisée.");
    }

    console.log("🎉 Base de données prête !");
    process.exit(0);
  } catch (error) {
    console.error("❌ Erreur lors de l'initialisation :", error);
    process.exit(1);
  }
};

// 🏁 Exécuter le script
initDB();

import mongoose, { Schema, Document, Types } from "mongoose";

interface IVoie extends Document {
  voieName: string;
  secteur: Types.ObjectId; // Référence à un secteur
  voieDescription: string;
  createdBy: Types.ObjectId; // Référence à l'utilisateur créateur
  difficultyRatings: string[]; // Notes de difficulté (1 à 5)
  completedBy: Types.ObjectId[]; // Liste des utilisateurs ayant réussi la voie
}

const VoieSchema = new Schema<IVoie>({
  voieName: { type: String, required: true },
  secteur: { type: Schema.Types.ObjectId, ref: "Secteur", required: true },
  voieDescription: { type: String, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  difficultyRatings: { type: [String], default: [] },
  completedBy: { type: [Schema.Types.ObjectId], ref: "User", default: [] },
});

export default mongoose.models.Voie ||
  mongoose.model<IVoie>("Voie", VoieSchema);

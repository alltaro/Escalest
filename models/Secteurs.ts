import mongoose, { Schema, Document } from "mongoose";

interface ISecteur extends Document {
  nom: string;
  description?: string;
}

const SecteurSchema: Schema = new Schema({
  nom: { type: String, required: true, unique: true },
  description: { type: String, default: "" },
});

export default mongoose.models.Secteur ||
  mongoose.model<ISecteur>("Secteur", SecteurSchema);

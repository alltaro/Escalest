import { getUserInfo } from "~/utils/auth"; // Chemin correct vers ta fonction

import jwt from "jsonwebtoken";

const JWT_SECRET = "6404f35f37147bca8b50c17e52425a70af0e4b4c7a47942046b305b07a2aac6a"; // Clé secrète

export function createJWT(id: string, email: string) {
  return jwt.sign(
    { id, email },
    JWT_SECRET,
    { expiresIn: "2h" } // Expiration dans 2 heures
  );
}

export function verifyJWT(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as { id: string; email: string };
  } catch (error) {
    console.error("Erreur lors de la vérification du JWT :", error);
    return null; // Retourne null si le token est invalide
  }
}


export async function getUsernameFromToken(token: string): Promise<string> {
  // Utiliser getUserInfo pour récupérer l'username
  const userInfo = await getUserInfo(token);
  if (typeof userInfo.username === "string" && typeof userInfo.email === "string") {
    // Retourner uniquement le nom d'utilisateur
    return userInfo.username;
  } else {
    throw new Error("Invalid token or user info");
  }
}


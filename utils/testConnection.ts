import connectToDB from "./db";

connectToDB().then(() => {
  console.log("Connexion réussie !");
  process.exit(0);
}).catch((err) => {
  console.error("Échec de la connexion :", err);
  process.exit(1);
});

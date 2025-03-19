import http from "http";
import { handleRoutes } from "./routes/routes.js"; // Importer le gestionnaire de routes

// Créer le serveur HTTP
const server = http.createServer((req, res) => {
  // Utiliser handleRoutes pour gérer toutes les requêtes
  handleRoutes(req, res);
});

// Lancer le serveur
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}`);
});

// Test de connexion à la base de données
import db from "./config/database.js";
db.get("SELECT 1", (err, row) => {
  if (err) {
    console.error("Test de la connexion échoué :", err);
  } else {
    console.log("Test de la connexion réussi !");
  }
});

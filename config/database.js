import sqlite3 from "sqlite3";
import path from "path";

// Résoudre le chemin vers ta base de données
const dbPath = path.resolve("bibliotheque.db");

// Créer une nouvelle instance de la base de données SQLite
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error(
      "Erreur lors de la connexion à la base de données : ",
      err.message,
    );
  } else {
    console.log("Connexion à la base de données réussie");
  }
});

// Exporter la connexion pour l'utiliser ailleurs dans le projet
export default db;

const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const path = require("path");

// Chemin vers ta base de données SQLite (assurez-vous que le chemin est correct)
const dbPath = path.join(__dirname, "bibliotheque.db");
// Ouvre la base de données (création si elle n'existe pas)
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Erreur lors de l'ouverture de la base de données:", err);
    return;
  }
  console.log("Base de données ouverte");
});

// Lire le fichier SQL (ajuster le chemin si nécessaire)
const initSqlPath = path.join(__dirname, "init.sql"); // ou "./sql/init.sql" selon la structure du projet
const initSql = fs.readFileSync(initSqlPath, "utf-8");

// Exécuter le script SQL pour initialiser la base de données
db.exec(initSql, (err) => {
  if (err) {
    console.error("Erreur lors de l'exécution du script SQL:", err);
  } else {
    console.log("Base de données initialisée avec succès");
  }
  db.close();
});

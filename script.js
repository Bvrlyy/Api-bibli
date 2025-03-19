const sqlite3 = require("sqlite3").verbose();

// Ouvrir la base de données SQLite
const db = new sqlite3.Database("./bibliotheque.db");

// Fonction pour exécuter une requête et afficher les résultats
function executeQuery(query) {
  db.all(query, [], (err, rows) => {
    if (err) {
      throw err;
    }
    console.log(rows);
  });
}

// Exécution de différentes requêtes
const queries = [
  "SELECT * FROM Livre",
  "SELECT * FROM Genre",
  "SELECT * FROM Auteur",
  "SELECT * FROM Emprunt",
];

// Exécuter les requêtes et afficher les résultats
queries.forEach((query) => {
  console.log(`Exécution de : ${query}`);
  executeQuery(query);
});

// Fermer la base de données après les requêtes
db.close();

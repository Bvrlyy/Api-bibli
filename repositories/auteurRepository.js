import db from "../config/database.js"; // Assurer que la connexion à la base de données est correctement configurée

// Récupérer tous les auteurs
export const getAllAuteurs = async () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM Auteur", (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

// Ajouter un auteur
export const addAuteur = async (nom, prenom, naissance, nationalite) => {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO Auteur (nom, prenom, naissance, nationalite) VALUES (?, ?, ?, ?)";
    db.run(sql, [nom, prenom, naissance, nationalite], function (err) {
      if (err) reject(err);
      else resolve(this.lastID);
    });
  });
};

export async function getAuteurById(id) {
  console.log("Requête en cours pour l'ID :", id);

  return new Promise((resolve, reject) => {
    db.get(
      "SELECT * FROM Auteur WHERE id_auteur = ?",
      [Number(id)],
      (err, row) => {
        if (err) {
          console.error("Erreur SQL :", err);
          reject(err);
        } else {
          console.log("Résultat SQL :", row);
          resolve(row);
        }
      },
    );
  });
}

export const updateAuteur = async (
  id_auteur,
  nom,
  prenom,
  naissance,
  nationalite,
) => {
  return new Promise((resolve, reject) => {
    console.log("Paramètres de la requête SQL :", {
      id_auteur,
      nom,
      prenom,
      naissance,
      nationalite,
    });

    const sql = `
      UPDATE Auteur
      SET  nom = ?, prenom = ?, 
          naissance = ?, nationalite = ?
      WHERE id_auteur = ?`;

    db.run(
      sql,
      [nom, prenom, naissance, nationalite, id_auteur],
      function (err) {
        if (err) {
          console.error("Erreur SQL :", err); // Log l'erreur SQL
          reject(err);
        } else {
          resolve({ message: "Auteur mis à jour avec succès !" });
        }
      },
    );
  });
};

// Vérifier si l'ID de l'auteur existe déjà
export const auteurExisteParId = async (id_auteur) => {
  console.log("entrée dans auteur existe par id ", id_auteur);

  return new Promise((resolve, reject) => {
    const sql = "SELECT COUNT(*) AS count FROM Auteur WHERE id_auteur = ?";
    db.get(sql, [id_auteur], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row.count > 0); // Si un auteur avec cet ID existe, on retourne true
      }
    });
  });
};

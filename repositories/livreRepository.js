import db from "../config/database.js";

// Exemple de fonction pour récupérer tous les livres
export const getAllBooks = () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM Livre", [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

// Exemple de fonction pour ajouter un livre
export const addBook = (book) => {
  const { titre, ISBN, annee_publication, editeur, id_genre } = book;
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO Livre (titre, ISBN, annee_publication, editeur, id_genre)
      VALUES (?, ?, ?, ?, ?)
    `;
    db.run(
      query,
      [titre, ISBN, annee_publication, editeur, id_genre],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id_livre: this.lastID });
        }
      },
    );
  });
};

export async function getBookById(id) {
  console.log("Requête en cours pour l'ID :", id);

  return new Promise((resolve, reject) => {
    console.log("🔍 Avant d'exécuter la requête SQL...");

    db.get(
      "SELECT * FROM Livre WHERE id_livre = ?",
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

export const updateBook = async (
  id_livre,
  titre,
  ISBN,
  annee_publication,
  editeur,
  id_genre,
) => {
  return new Promise((resolve, reject) => {
    console.log("Paramètres de la requête SQL :", {
      id_livre,
      titre,
      ISBN,
      annee_publication,
      editeur,
      id_genre,
    });

    const sql = `
      UPDATE Livre
      SET  titre = ?, ISBN = ?, 
          annee_publication = ?, editeur = ?,id_genre = ?
      WHERE id_livre = ?`;

    db.run(
      sql,
      [titre, ISBN, annee_publication, editeur, id_genre, id_livre],
      function (err) {
        if (err) {
          console.error("Erreur SQL :", err); // Log l'erreur SQL
          reject(err);
        } else {
          resolve({ message: "Livre mis à jour avec succès !" });
        }
      },
    );
  });
};

export const findByGenre = (nom) => {
  console.log("Genre passé, entrée repository :", nom); // Vérifie ici aussi
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT * 
      FROM Livre 
      INNER JOIN Genre ON Livre.id_genre = Genre.id_genre
      WHERE Genre.nom = ?`,
      [nom],
      (err, rows) => {
        if (err) {
          console.error("Erreur SQL :", err);
          reject(err);
        } else {
          console.log("Résultats SQL :", rows); // Vérifie le contenu de rows
          resolve(rows);
        }
      },
    );
  });
};
export const findByAuthor = (nom) => {
  console.log("Auteur passé, entrée repository :", nom); // Vérifie ici aussi
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT *
       FROM Livre
       INNER JOIN Ecrit ON Ecrit.id_livre = Livre.id_livre
       INNER JOIN Auteur ON Auteur.id_auteur = Ecrit.id_auteur
       WHERE Auteur.id_auteur = ?`,
      [nom],
      (err, rows) => {
        if (err) {
          console.error("Erreur SQL :", err);
          reject(err);
        } else {
          console.log("Résultats SQL :", rows); // Vérifie le contenu de rows
          resolve(rows);
        }
      },
    );
  });
};

// Dans livreRepository.js, ajoutez cette nouvelle fonction
// Pour la pagination des livres
export const getBooksPaginated = (page, limit) => {
  const offset = (page - 1) * limit;

  return new Promise((resolve, reject) => {
    // Première requête pour obtenir les livres avec pagination
    db.all(
      "SELECT * FROM Livre LIMIT ? OFFSET ?",
      [limit, offset],
      (err, rows) => {
        if (err) {
          console.error(
            "Erreur lors de la récupération des livres paginés:",
            err,
          );
          reject(err);
        } else {
          // Deuxième requête pour obtenir le nombre total de livres
          db.get(
            "SELECT COUNT(*) as total FROM Livre",
            [],
            (countErr, countRow) => {
              if (countErr) {
                console.error("Erreur lors du comptage des livres:", countErr);
                reject(countErr);
              } else {
                // Construire l'objet de réponse avec les métadonnées de pagination
                resolve({
                  data: rows,
                  pagination: {
                    currentPage: page,
                    itemsPerPage: limit,
                    totalItems: countRow.total,
                    totalPages: Math.ceil(countRow.total / limit),
                  },
                });
              }
            },
          );
        }
      },
    );
  });
};

export const livreExiste = (id) => {
  console.log("Vérification de l'ID dans la base de données :", id);
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT id_livre FROM Livre WHERE id_livre = ?",
      [id],
      (err, row) => {
        if (err) {
          console.error(
            "Erreur lors de la vérification de l'ID dans la base de données :",
            err,
          );
          reject(err);
        } else {
          console.log("Résultat de la requête SQL :", row);
          resolve(!!row && !!row.id_livre); // Résoud avec true si la ligne existe, false sinon
        }
      },
    );
  });
};

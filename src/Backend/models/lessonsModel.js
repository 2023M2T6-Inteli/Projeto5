function getAllLessons(db) {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM lessons ORDER BY id ASC", (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
}

function postLessons(db, params) {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO lessons (class_id, date) VALUES (?, ?)",
      params,
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve("Aula inserida");
        }
      }
    );
  });
}

function getLessons(db, lesson_id) {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM lessons WHERE id = ?", [lesson_id], (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
}

function putLessons(db, params) {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      const sqlQuery = "UPDATE lessons SET class_id = ?, date = ? WHERE id = ?";

      db.run(sqlQuery, params, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve("Aula atualizada");
        }
      });
    });
  });
}

function removeLessons(db, lesson_id) {
  return new Promise((resolve, reject) => {
    db.all("DELETE FROM lessons WHERE id = ?", [lesson_id], (err) => {
      if (err) {
        reject(err);
      }
      resolve("Aula Removida");
    });
  });
}

module.exports = {
  getAllLessons,
  postLessons,
  getLessons,
  putLessons,
  removeLessons,
};

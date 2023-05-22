const db = require("sqlite3");

function getAllStudentNotes(db) {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM student_notes ORDER BY id ASC", (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
}

function postStudentNotes(db, params) {
  return new Promise((resolve, reject) =>
    db.run(
      "INSERT INTO student_notes (student_id, note, lesson_id) VALUES (?, ?, ?)",
      params,
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve("Nota inserida");
        }
      }
    )
  );
}

function getStudentNotes(db, studentNotes_id) {
  return new Promise((resolve, reject) => {
    db.all(
      "SELECT * FROM student_notes WHERE id = ?",
      [studentNotes_id],
      (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      }
    );
  });
}

function putStudentNotes(db, params) {
  return new Promise((resolve, reject) =>
    db.serialize(() => {
      const sqlQuery =
        "UPDATE student_notes SET student_id = ?, note = ?, lesson_id = ? WHERE id = ?";

      db.run(sqlQuery, params, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve("Nota atualizada");
        }
      });
    })
  );
}

function removeStudentNotes(db, studentNotes_id) {
  return new Promise((resolve, reject) => {
    db.all(
      "DELETE FROM student_notes WHERE id = ?",
      [studentNotes_id],
      (err) => {
        if (err) {
          reject(err);
        }
        resolve("Nota removida");
      }
    );
  });
}

module.exports = {
  getAllStudentNotes,
  postStudentNotes,
  getStudentNotes,
  putStudentNotes,
  removeStudentNotes,
};

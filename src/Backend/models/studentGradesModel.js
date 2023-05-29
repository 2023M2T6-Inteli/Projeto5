const db = require("sqlite3");

function getAllGrade(db) {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM student_grades ORDER BY id ASC", (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
}

function postGrade(db, params) {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO student_grades (student_id, lesson_id, grade1, grade2, grade3, grade4, grade5) VALUES (?, ?, ?, ?, ?, ?, ?)",
      params,
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve("Nota inserida");
        }
      }
    );
  });
}

function getGrade(db, grade_id) {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM student_grades WHERE id= ?", [grade_id], (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
}

function putGrade(db, params) {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      const sqlQuery =
        "UPDATE student_grades SET student_id = ?, lesson_id = ?, grade1 = ?, grade2 = ?, grade3 = ?, grade4 = ?, grade5 = ?, WHERE id = ?";

      db.run(sqlQuery, params, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve("Nota atualizada");
        }
      });
    });
  });
}

function removeGrade(db, grade_id) {
  return new Promise((resolve, reject) => {
    db.all("DELETE FROM student_grades WHERE id= ?", [grade_id], (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve("Nota deletada");
    });
  });
}

module.exports = {
  getAllGrade,
  postGrade,
  getGrade,
  putGrade,
  removeGrade,
};

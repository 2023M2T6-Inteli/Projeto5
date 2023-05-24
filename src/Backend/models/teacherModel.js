const db = require("sqlite3");

function getAllTeachers(db) {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM teachers ORDER BY id ASC", (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
}

function postTeachers(db, params) {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO teachers (name, email, password) VALUES (?, ?, ?)",
      params,
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve("Professor(a) inserido(a) ");
        }
      }
    );
  });
}

function getTeachers(db, teacher_id) {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM teachers WHERE id= ?", [teacher_id], (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
}

function putTeachers(db, params) {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      const sqlQuery =
        "UPDATE teachers SET name = ?, email = ?, password = ? WHERE id = ?";

      db.run(sqlQuery, params, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve("Professor(a) atualizado(a)");
        }
      });
    });
  });
}

function removeTeachers(db, teacher_id) {
  return new Promise((resolve, reject) => {
    db.all("DELETE FROM teachers WHERE id= ?", [teacher_id], (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve("Professor(a) deletado(a)");
    });
  });
}

module.exports = {
  getAllTeachers,
  postTeachers,
  getTeachers,
  putTeachers,
  removeTeachers,
};

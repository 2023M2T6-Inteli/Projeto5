const db = require("sqlite3");

function getAllClass(db) {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM classes ORDER BY id ASC", (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
}

function postClass(db, params) {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO classes (class_title, teacher_id) VALUES (?, ?)",
      params,
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve("Turma inserida!");
        }
      }
    );
  });
}

function getClass(db, class_id) {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM classes WHERE id= ?", [class_id], (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
}

function putClass(db, params) {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      const sqlQuery =
        "UPDATE classes SET class_title = ?, teacher_id = ? WHERE id = ?";

      db.run(sqlQuery, params, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve("Turma atualizada");
        }
      });
    });
  });
}

function removeClass(db, class_id) {
  return new Promise((resolve, reject) => {
    db.all("DELETE FROM classes WHERE id= ?", [class_id], (err) => {
      if (err) {
        reject(err);
      }
      resolve("Turma deletada");
    });
  });
}

function getTeachers(db) {
  console.log("model");
  return new Promise((resolve, reject) => {
    const sqlQuery =
      "SELECT c.class_title, t.name as teacher FROM classes as c JOIN teachers as t ON c.teacher_id = t.id";
    db.all(sqlQuery, (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
}

function getClassesByTeacherId(db, teacherId) {
  return Promise((resolve, reject) =>{
      const sqlQuery = "SELECT * FROM classes WHERE teacher_id = ?"
      const params = [teacherId]
      db.all(sqlQuery, params, (err, rows) =>{
        if(err){
          reject(err);
        }
        else{
          resolve(rows);
        }
      })
  })
}
function postClassByTeacherId(db, params){
  return Promise((resolve, reject) => {
      const sqlQuery = "INSERT INTO classes (class_title, teacher_id) VALUES(?, ?)"
      
      db.run(sqlQuery, params, (err) => {
        if(err) {
        reject(err);
        }
        else{
        resolve("turma inserida!");
        }
      }
    );
  });
}
module.exports = {
  getAllClass,
  postClass,
  getClass,
  putClass,
  removeClass,
  getTeachers,
  getClassesByTeacherId,
  postClassByTeacherId,
};

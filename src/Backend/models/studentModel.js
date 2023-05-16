const db = require('sqlite3');

function getAll(db){
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM students ORDER BY id ASC', (err, rows) => {
            if(err){
                reject(err);
            }
            resolve(rows);
        })
    })
}

function post(db, params){
    return new Promise((resolve, reject) => {
        db.run("INSERT INTO students (name, class_id, call_number) VALUES (?, ?, ?)", params , (err) => {
            if (err) {
                reject(err);
            } else {
                resolve("Success")
            }
        })
    })
}

function get(db, student_id){
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM students WHERE id= ?', [student_id], (err, rows) => {
            if(err){
                reject(err);
            }
            resolve(rows);
        })
    })
}

function put(db, params) {
    return new Promise((resolve, reject) => {
      db.serialize(() => {
        const sqlQuery =
          "UPDATE students SET name = ?, class_id = ?, call_number = ? WHERE id = ?";
  
        db.run(sqlQuery, params, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve("Usuário atualizado");
          }
        });
      });
    });
  }

function remove(db, student_id){
return new Promise((resolve, reject) => {
    db.all('DELETE FROM students WHERE id= ?', [student_id], (err, rows) => {
        if(err){
            reject(err);
        }
        resolve("Usuário deletado");
    })
})
}

module.exports = {
    getAll,
    post,
    get,
    put,
    remove
}
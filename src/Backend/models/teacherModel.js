const db = require('sqlite3');

function getAll(db){
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM teachers ORDER BY id ASC', (err, rows) => {
            if(err){
                reject(err);
            }
            resolve(rows);
        })
    })
}

function post(db, params){
    return new Promise((resolve, reject) => {
        db.run("INSERT INTO teachers (name, email, password) VALUES (?, ?, ?)",params , (err) => {
            if (err) {
                reject(err);
            } else {
                resolve("Success")
            }
        })
    })
}

function get(db, teacher_id){
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM teachers WHERE id= ?', [teacher_id], (err, rows) => {
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
          "UPDATE teachers SET name = ?, email = ?, password = ? WHERE id = ?";
  
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

function remove(db, teacher_id){
return new Promise((resolve, reject) => {
    db.all('DELETE FROM teachers WHERE id= ?', [teacher_id], (err, rows) => {
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
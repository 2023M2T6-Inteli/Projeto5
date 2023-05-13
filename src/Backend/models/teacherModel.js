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

module.exports = {
    getAll
}
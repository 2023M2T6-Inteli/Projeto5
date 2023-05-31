const db = require("sqlite3");

function getUserByEmail(db, email) {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM teachers WHERE email = ?", [email], (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
}

module.exports = {
  getUserByEmail,
};
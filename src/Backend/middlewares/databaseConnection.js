const sqlite3 = require('sqlite3').verbose();

function databaseConnection(req, res, next) {
    // verify if the connection already was req
    if (req.db) {
        return next();
    }

  // open the connection with db
  const db = new sqlite3.Database(__dirname + '/../data/database.sqlite');

  req.db = db;

  // middleware for closing connection after use
  res.on('finish', () => {
    db.close((err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log('Conexão com o banco de dados fechada com sucesso.');
      }
    });
  });

  next();
}

module.exports = databaseConnection;
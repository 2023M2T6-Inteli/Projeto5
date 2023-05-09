const sqlite3 = require("sqlite3").verbose();
const DBPATH = "./database.db";

const databaseConnection = new sqlite3.Database(DBPATH);

module.exports = databaseConnection;

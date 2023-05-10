const express = require("express");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const sqlite3 = require("sqlite3").verbose();
const DBPATH = "./database/database.db";
const hostname = "127.0.0.1";
const port = 3000;
const app = express();
app.use(express.json());

app.post("/insertProfessor", urlencodedParser, insertProfessores);
app.get("/getProfessores", getProfessores);
app.get("/updateProfessor", getUpdateProfessores);
app.post("/updateProfessor ", urlencodedParser, postUpdateProfessores);
app.delete("/removeProfessor", urlencodedParser, removeProfessores);

app.listen(port, hostname, () => {
    console.log(`Servidor rodando em http://${hostname}:${port}/`);
});

function getProfessores(req, res) {
    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");
    const databaseConnection = new sqlite3.Database(DBPATH);
    const sqlQuery = "SELECT * FROM Professores ORDER BY id ASC";
    databaseConnection.all(sqlQuery, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    databaseConnection.close();
}

function insertProfessores(req, res) {
    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");
    const database = new sqlite3.Database(DBPATH);
    const sqlQuery =
        "INSERT INTO Professores (nome, email, senha) VALUES (?, ?, ?)";

    const params = [req.body.nome, req.body.email, req.body.senha];

    database.run(sqlQuery, params, (err) => {
        if (err) {
            throw err;
        }
    });
    res.write("<h1>Usuario criado</h1>");
    database.close();
    res.end();
}

function getUpdateProfessores(req, res) {
    if (!req.query.userId) {
        res.statusCode = 400;
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.write("<h1>Usuario não encontrado</h1>");
        res.end();
        return;
    }

    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");
    const sqlQuery = "SELECT * FROM Professores WHERE id=" + req.query.userId;

    const database = new sqlite3.Database(DBPATH); // Abre o banco
    database.all(sqlQuery, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    database.close(); // Fecha o banco
}

function postUpdateProfessores(req, res) {
    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");
    const database = new sqlite3.Database(DBPATH);

    database.serialize(() => {
        const sqlQuery =
            "UPDATE Professores SET nome = ?, email = ?, senha = ? WHERE id = ?";

        const params = [
            req.body.nome,
            req.body.email,
            req.body.senha,
            req.query.userId,
        ];

        database.run(sqlQuery, params, (err) => {
            if (err) {
                throw err;
            }
            res.write("<h1>Usuario atualizado</h1>");
            res.end();
        });
    });

    database.close();
}

function removeProfessores(req, res) {
    if (!req.query.userId) {
        res.statusCode = 400;
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.write("<h1>Usuario não encontrado</h1>");
        res.end();
        return;
    }

    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");
    const sqlQuery = "DELETE FROM Usuarios WHERE id='" + req.query.userId + "'";

    const database = new sqlite3.Database(DBPATH); // Abre o banco
    database.run(sqlQuery, [], (err) => {
        if (err) {
            throw err;
        }
        res.write("<h1>Usuario removido</h1>");
        res.end();
    });
    database.close(); // Fecha o banco
}

const express = require("express");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const sqlite3 = require("sqlite3").verbose();
const DBPATH = './database/database.db';
const hostname = "127.0.0.1";
const port = 3000;
const app = express();
app.use(express.json());

// rotas professores
app.post("/insertProfessor", urlencodedParser, insertProfessores);
app.get("/getProfessores", getProfessores);
app.get("/updateProfessor", getUpdateProfessores);
app.post("/updateProfessor", urlencodedParser, postUpdateProfessores);
app.delete("/removeProfessor", urlencodedParser, removeProfessores);

// rotas turmas
app.post("/insertTurma", urlencodedParser, insertTurmas);
app.get("/getTurma", getTurmas);
app.get("/updateTurma", getUpdateTurmas);
app.post("/updateTurma", urlencodedParser, postUpdateTurmas);
app.delete("/removeTurma", urlencodedParser, removeTurmas);

// rota professor + turma
app.get("professorTurma", getProfessorTurma)

app.listen(port, hostname, () => {
    console.log(`Servidor rodando em http://${hostname}:${port}/`);
});

// funcoes professores

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
    const databaseConnection = new sqlite3.Database(DBPATH);
    const sqlQuery =
        "INSERT INTO Professores (nome, email, senha) VALUES (?, ?, ?)";

    const params = [req.body.nome, req.body.email, req.body.senha];

    databaseConnection.run(sqlQuery, params, (err) => {
        if (err) {
            throw err;
        }
    });
    res.write("<h1>Usuario criado</h1>");
    databaseConnection.close();
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
    const sqlQuery = "SELECT * FROM Professores WHERE id= ?"

    const databaseConnection = new sqlite3.Database(DBPATH); // Abre o banco
    databaseConnection.all(sqlQuery, [req.query.userId], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    databaseConnection.close(); // Fecha o banco
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

        databaseConnection.run(sqlQuery, params, (err) => {
            if (err) {
                throw err;
            }
            res.write("<h1>Usuario atualizado</h1>");
            res.end();
        });
    });

    databaseConnection.close();
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
    const sqlQuery = "DELETE FROM Usuarios WHERE id= ?";

    const databaseConnection = new sqlite3.Database(DBPATH); // Abre o banco
    databaseConnection.run(sqlQuery, [req.query.userId], (err) => {
        if (err) {
            throw err;
        }
        res.write("<h1>Usuario removido</h1>");
        res.end();
    });
    databaseConnection.close(); // Fecha o banco
}

// funcoes turmas

function getTurmas(req, res) {
    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");
    const databaseConnection = new sqlite3.Database(DBPATH);
    const sqlQuery = "SELECT * FROM Turmas ORDER BY id ASC";
    databaseConnection.all(sqlQuery, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    databaseConnection.close();
}

function insertTurmas(req, res) {
    res.statusCode = 500;
    res.setHeader("Access-Control-Allow-Origin", "*");
    const databaseConnection = new sqlite3.Database(DBPATH);
    const sqlQuery = "INSERT INTO Turmas (titulo_turma, professor_id) VALUES (?, ?)";
    const params = [req.body.titulo_turma, req.body.professor_id];
    databaseConnection.run(sqlQuery, params, (err) => {
        if (err){
            throw err;
        }
    });
    res.write("<h1>Turma criada</h1>");
    database.close()
    res.end()

}

function getUpdateTurmas(req, res) {
    if (!req.query.userId) {
        res.statusCode = 400;
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.write("<h1>Usuario não encontrado</h1>");
        res.end();
        return;
    }

    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");
    const sqlQuery = "SELECT * FROM Turma WHERE id= ?";

    const databaseConnection = new sqlite3.Database(DBPATH); // Abre o banco
    databaseConnection.all(sqlQuery, [req.query.turmaId], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    database.close(); // Fecha o banco
}

function postUpdateTurmas(req, res) {
    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");
    const databaseConnection = new sqlite3.Database(DBPATH);

    database.serialize(() => {
        const sqlQuery =
            "UPDATE Turmas SET titulo_turma = ?, professor_id = ? WHERE id = ?";

        const params = [
            req.body.titulo_turma,
            req.body.professorId,
            req.query.turmaId
        ];

        databaseConnection.run(sqlQuery, params, (err) => {
            if (err) {
                throw err;
            }
            res.write("<h1>Turma atualizada</h1>");
            res.end();
        });
    });

    database.close();
}

function removeTurmas(req, res) {
    if (!req.query.userId) {
        res.statusCode = 400;
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.write("<h1>Turma não encontrada</h1>");
        res.end();
        return;
    }

    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");
    const sqlQuery = "DELETE FROM Usuarios WHERE id= ?";

    const databaseConnection = new sqlite3.Database(DBPATH); // Abre o banco
    databaseConnection.run(sqlQuery, [req.query.turmaId], (err) => {
        if (err) {
            throw err;
        }
        res.write("<h1>Turma removida</h1>");
        res.end();
    });
    databaseConnection.close(); // Fecha o banco
}

// join professores e turma

function getProfessorTurma(req, res) {
    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");
    const sqlQuery = "SELECT p.nome t.titulo_turma FROM Turmas as t JOIN Professores as p ON turma.professor_id = p.id";

    const databaseConnection = new sqlite3.Database(DBPATH); // Abre o banco
    databaseConnection.all(sqlQuery, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    databaseConnection.close();
}
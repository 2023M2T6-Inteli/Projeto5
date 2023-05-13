const express = require("express");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const sqlite3 = require("sqlite3").verbose();
const databaseConnection = require("./middlewares/databaseConnection");
const hostname = "127.0.0.1";
const port = 3000;
const app = express();
app.use(express.json());
app.use(databaseConnection);

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
app.get("/getProfessorTurma", getProfessorTurma)

app.listen(port, hostname, () => {
    console.log(`Servidor rodando em http://${hostname}:${port}/`);
});

// funcoes professores

function getProfessores(req, res) {
    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");
    const sqlQuery = "SELECT * FROM Professores ORDER BY id ASC";
    req.db.all(sqlQuery, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
}

function insertProfessores(req, res) {
    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");
    const sqlQuery =
        "INSERT INTO Professores (nome, email, senha) VALUES (?, ?, ?)";

    const params = [req.body.nome, req.body.email, req.body.senha];

    req.db.run(sqlQuery, params, (err) => {
        if (err) {
            throw err;
        }
    });
    res.write("<h1>Usuario criado</h1>");
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
    req.db.all(sqlQuery, [req.query.userId], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    }); 
}

function postUpdateProfessores(req, res) {
    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");

    req.db.serialize(() => {
        const sqlQuery =
            "UPDATE Professores SET nome = ?, email = ?, senha = ? WHERE id = ?";

        const params = [
            req.body.nome,
            req.body.email,
            req.body.senha,
            req.query.userId,
        ];

        req.db.run(sqlQuery, params, (err) => {
            if (err) {
                throw err;
            }
            res.write("<h1>Usuario atualizado</h1>");
            res.end();
        });
    });

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
    const sqlQuery = "DELETE FROM Professores WHERE id= ?";
    req.db.run(sqlQuery, [req.query.userId], (err) => {
        if (err) {
            throw err;
        }
        res.write("<h1>Usuario removido</h1>");
        res.end();
    }); 
}

// funcoes turmas

function getTurmas(req, res) {
    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");
    const sqlQuery = "SELECT * FROM Turmas ORDER BY id ASC";
    req.db.all(sqlQuery, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
}

function insertTurmas(req, res) {
    res.statusCode = 500;
    res.setHeader("Access-Control-Allow-Origin", "*");
    const sqlQuery = "INSERT INTO Turmas (titulo_turma, professor_id) VALUES (?, ?)";
    const params = [req.body.titulo_turma, req.body.professor_id];
    req.db.run(sqlQuery, params, (err) => {
        if (err){
            throw err;
        }
    });
    res.write("<h1>Turma criada</h1>");
    res.end()

}

function getUpdateTurmas(req, res) {
    if (!req.query.turmaId) {
        res.statusCode = 400;
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.write("<h1>Usuario não encontrado</h1>");
        res.end();
        return;
    }

    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");
    const sqlQuery = "SELECT * FROM Turmas WHERE id= ?";
    req.db.all(sqlQuery, [req.query.turmaId], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    }); 
}

function postUpdateTurmas(req, res) {
    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");

    req.db.serialize(() => {
        const sqlQuery =
            "UPDATE Turmas SET titulo_turma = ?, professor_id = ? WHERE id = ?";

        const params = [
            req.body.titulo_turma,
            req.body.professorId,
            req.query.turmaId
        ];

        req.db.run(sqlQuery, params, (err) => {
            if (err) {
                throw err;
            }
            res.write("<h1>Turma atualizada</h1>");
            res.end();
        });
    });

}

function removeTurmas(req, res) {
    if (!req.query.turmaId) {
        res.statusCode = 400;
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.write("<h1>Turma não encontrada</h1>");
        res.end();
        return;
    }

    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");
    const sqlQuery = "DELETE FROM Turmas WHERE id= ?";
    req.db.run(sqlQuery, [req.query.turmaId], (err) => {
        if (err) {
            throw err;
        }
        res.write("<h1>Turma removida</h1>");
        res.end();
    }); 
}

// join professores e turma

function getProfessorTurma(req, res) {
    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");
    const sqlQuery = "SELECT p.nome, t.titulo_turma FROM Turmas as t JOIN Professores as p ON t.professor_id = p.id";
    req.db.all(sqlQuery, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
}
const express = require("express");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const databaseConnection = require("./middlewares/databaseConnection");
const hostname = "127.0.0.1";
const port = 3000;
const app = express();
app.use(express.json());
const teacherRoute = require("./routes/teacher");
app.use(databaseConnection);

app.use("/teacher", teacherRoute);


// rotas turmas
app.post("/insertTurma", urlencodedParser, insertTurmas);
app.get("/getTurma", getTurmas);
app.get("/updateTurma", getUpdateTurmas);
app.post("/updateTurma", urlencodedParser, postUpdateTurmas);
app.delete("/removeTurma", urlencodedParser, removeTurmas);


app.listen(port, hostname, () => {
    console.log(`Servidor rodando em http://${hostname}:${port}/`);
});


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
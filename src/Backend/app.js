const express = require("express");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const databaseConnection = require("./middlewares/databaseConnection");
const hostname = "127.0.0.1";
const port = 3000;
const app = express();
app.use(express.json());
const teacherRoute = require("./routes/teacher");
const classRoute = require("./routes/class")
app.use(databaseConnection);



app.use("/teacher", teacherRoute);
app.use("/class", classRoute)




app.listen(port, hostname, () => {
    console.log(`Servidor rodando em http://${hostname}:${port}/`);
});




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
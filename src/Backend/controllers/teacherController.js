const express = require("express");
const app = express();
const databaseConnection = require("../middlewares/databaseConnection");
app.use(databaseConnection);

module.exports = {
    getAll: (req, res) => {
        res.statusCode = 200;
        res.setHeader("Access-Control-Allow-Origin", "*");
        const sqlQuery = "SELECT * FROM Professores ORDER BY id ASC";
        req.db.all(sqlQuery, [], (err, rows) => {
            if (err) {
                throw err;
            }
            res.json(rows);
        });
    },
    post: (req, res) => {
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
    },
    get: (req, res) => {
        res.statusCode = 200;
        res.setHeader("Access-Control-Allow-Origin", "*");
        const sqlQuery = "SELECT * FROM Professores WHERE id= ?"
        req.db.all(sqlQuery, [req.params.teacher_id], (err, rows) => {
            if (err) {
                throw err;
            }
            res.json(rows);
        }); 
    },
    put: (req, res) => {
        res.statusCode = 200;
        res.setHeader("Access-Control-Allow-Origin", "*");
    
        req.db.serialize(() => {
            const sqlQuery =
                "UPDATE Professores SET nome = ?, email = ?, senha = ? WHERE id = ?";
    
            const params = [
                req.body.nome,
                req.body.email,
                req.body.senha,
                req.params.teacher_id,
            ];
    
            req.db.run(sqlQuery, params, (err) => {
                if (err) {
                    throw err;
                }
                res.write("<h1>Usuario atualizado</h1>");
                res.end();
            });
        });
    },
    delete: (req, res) => {
        res.statusCode = 200;
        res.setHeader("Access-Control-Allow-Origin", "*");
        const sqlQuery = "DELETE FROM Professores WHERE id= ?";
        req.db.run(sqlQuery, [req.params.teacher_id], (err) => {
            if (err) {
                throw err;
            }
            res.write("<h1>Usuario removido</h1>");
            res.end();
        }); 
    }
}





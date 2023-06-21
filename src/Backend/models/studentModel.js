const db = require("sqlite3");

function getAllStudent(db) {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM students ORDER BY id ASC", (err, rows) => {
            if (err) {
                reject(err);
            }
            resolve(rows);
        });
    });
}

function getStudentByClassId(db, params) {
    return new Promise((resolve, reject) => {
        db.all(
            "SELECT * FROM students WHERE class_id= ? ORDER BY call_number",
            params,
            (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            }
        );
    });
}

function postStudent(db, params) {
    return new Promise((resolve, reject) => {
        db.run(
            "INSERT INTO students (name, class_id, call_number) VALUES (?, ?, ?)",
            params,
            (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve("Aluno inserido");
                }
            }
        );
    });
}

function getStudent(db, student_id) {
    return new Promise((resolve, reject) => {
        db.all(
            "SELECT * FROM students WHERE id= ?",
            [student_id],
            (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            }
        );
    });
}

function putStudent(db, params) {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            const sqlQuery =
                "UPDATE students SET name = ?, class_id = ?, call_number = ? WHERE id = ?";

            db.run(sqlQuery, params, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve("Aluno atualizado");
                }
            });
        });
    });
}

function removeStudent(db, student_id) {
    return new Promise((resolve, reject) => {
        db.all(
            "DELETE FROM students WHERE id= ?",
            [student_id],
            (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve("Aluno deletado");
            }
        );
    });
}

module.exports = {
    getAllStudent,
    postStudent,
    getStudent,
    putStudent,
    removeStudent,
    getStudentByClassId,
};

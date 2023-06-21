const db = require("sqlite3");

// CRUD

function getAllGrade(db) {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM student_grades ORDER BY id ASC", (err, rows) => {
            if (err) {
                reject(err);
            }
            resolve(rows);
        });
    });
}

function postGrade(db, params) {
    return new Promise((resolve, reject) => {
        db.run(
            "INSERT INTO student_grades (student_id, grade1, grade2, grade3, grade4, grade5) VALUES (?, ?, ?, ?, ?, ?)",
            params,
            (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve("Nota inserida");
                }
            }
        );
    });
}

function getGrade(db, grade_id) {
    return new Promise((resolve, reject) => {
        db.all(
            "SELECT * FROM student_grades WHERE id= ?",
            [grade_id],
            (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            }
        );
    });
}

function putGrade(db, params) {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            const sqlQuery =
                "UPDATE student_grades SET student_id = ?, grade1 = ?, grade2 = ?, grade3 = ?, grade4 = ?, grade5 = ?, WHERE id = ?";

            db.run(sqlQuery, params, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve("Nota atualizada");
                }
            });
        });
    });
}

function removeGrade(db, grade_id) {
    return new Promise((resolve, reject) => {
        db.all(
            "DELETE FROM student_grades WHERE id= ?",
            [grade_id],
            (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve("Nota deletada");
            }
        );
    });
}

//

function getAverageClassGrades(db, class_id) {
    return new Promise((resolve, reject) => {
        const sqlQuery = `
      SELECT AVG(grade1) AS average_grade1,
        AVG(grade2) AS average_grade2,
        AVG(grade3) AS average_grade3,
        AVG(grade4) AS average_grade4,
        AVG(grade5) AS average_grade5
      FROM student_grades
      JOIN students ON student_grades.student_id = students.id
      WHERE students.class_id = ?`;

        db.get(sqlQuery, [class_id], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
}

function postStudentGrade(db, params) {
    return new Promise((resolve, reject) => {
        db.run(
            "INSERT INTO student_grades (student_id, grade1, grade2, grade3, grade4, grade5) VALUES (?, ?, ?, ?, ?, ?)",
            params,
            (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve("Nota inserida");
                }
            }
        );
    });
}

function postClassGrade(db, params) {
    return new Promise((resolve, reject) => {
        console.log(params);
        db.run(
            `INSERT INTO student_grades (student_id, grade1, grade2, grade3, grade4, grade5)
      SELECT students.id, ?, ?, ?, ?, ?
      FROM students
      INNER JOIN classes ON students.class_id = classes.id
      WHERE classes.id = ?;`,
            params,
            (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve("Nota inserida");
                }
            }
        );
    });
}

function getStudentAvgGrades(db, student_id) {
    return new Promise((resolve, reject) => {
        db.all(
            `SELECT 
          AVG(grade1) AS average_grade1, 
          AVG(grade2) AS average_grade2,
          AVG(grade3) AS average_grade3, 
          AVG(grade4) AS average_grade4, 
          AVG(grade5) AS average_grade5
          FROM student_grades WHERE student_id = ?`,
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

module.exports = {
    getAllGrade,
    postGrade,
    getGrade,
    putGrade,
    removeGrade,
    getAverageClassGrades,
    postStudentGrade,
    postClassGrade,
    getStudentAvgGrades,
};

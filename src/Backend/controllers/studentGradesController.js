const express = require("express");
const app = express();
const databaseConnection = require("../middlewares/databaseConnection");
app.use(databaseConnection);
const studentModel = require("../models/studentGradesModel");

async function getAllGrades(req, res) {
    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");
    const result = await studentModel.getAllGrade(req.db);
    res.json(result);
}

async function postGrades(req, res) {
    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");
    const result = await studentModel.postGrade(req.db, [
        req.body.student_id,
        req.body.grade1,
        req.body.grade2,
        req.body.grade3,
        req.body.grade4,
        req.body.grade5,
    ]);
    res.json(result);
}

async function getGrades(req, res) {
    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");
    const result = await studentModel.getGrade(req.db, req.params.grade_id);
    res.json(result);
}

async function putGrades(req, res) {
    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");
    const result = await studentModel.putGrade(req.db, [
        req.body.student_id,
        req.body.grade1,
        req.body.grade2,
        req.body.grade3,
        req.body.grade4,
        req.body.grade5,
        req.params.grade_id,
    ]);
    res.json(result);
}

async function removeGrades(req, res) {
    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");
    const result = await studentModel.removeGrade(req.db, req.params.grade_id);
    res.json(result);
}

//

async function getAverageClassGrades(req, res) {
    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");
    const result = await studentModel.getAverageClassGrades(
        req.db,
        req.params.class_id
    );
    res.json(result);
}

async function postStudentGrade(req, res) {
    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");
    const result = await studentModel.postStudentGrade(req.db, [
        req.params.student_id,
        req.body.grade1,
        req.body.grade2,
        req.body.grade3,
        req.body.grade4,
        req.body.grade5,
    ]);
    res.json(result);
}

async function postClassGrade(req, res) {
    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");
    console.log(req.body);
    const result = await studentModel.postClassGrade(req.db, [
        req.body.grade1,
        req.body.grade2,
        req.body.grade3,
        req.body.grade4,
        req.body.grade5,
        req.params.class_id,
    ]);
    res.json(result);
}

async function getStudentGrades(req, res) {
    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");
    const result = await studentModel.getStudentAvgGrades(
        req.db,
        req.params.student_id
    );

    res.json(result);
}

module.exports = {
    getAllGrades,
    postGrades,
    getGrades,
    putGrades,
    removeGrades,
    getAverageClassGrades,
    postStudentGrade,
    postClassGrade,
    getStudentGrades,
};

const express = require("express");
const app = express();
const databaseConnection = require("../middlewares/databaseConnection");
app.use(databaseConnection);
const studentNotesModel = require("../models/studentNotesModel");

async function getAllStudentNotes(req, res) {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  const result = await studentNotesModel.getAllStudentNotes(req.db);
  res.json(result);
}

async function postStudentNotes(req, res) {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  const result = await studentNotesModel.postStudentNotes(req.db, [
    req.body.student_id,
    req.body.note,
    req.body.lesson_id,
  ]);
  res.json(result);
}

async function getStudentNotes(req, res) {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  const result = await studentModel.getStudentNotes(
    req.db,
    req.params.studentNote_id
  );
  res.json(result);
}

async function putStudentNotes(req, res) {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  const result = await studentNotesModel.putStudentNotes(req.db, [
    req.body.student_id,
    req.body.note,
    req.body.lesson_id,
    req.params.studentNote_id,
  ]);
  res.json(result);
}

async function removeStudentNotes(req, res) {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  const result = await studentNotesModel.removeStudentNotes(
    req.db,
    req.params.studentNote_id
  );
  res.json(result);
}

async function getTeachers(req, req) {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  const result = await studentNotesModel.getTeachers(req.db);
  res.json(result);
}

async function getClass(req, req) {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  const result = await studentNotesModel.getClass(req.db);
  res.json(result);
}

async function getStudent(req, req) {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  const result = await studentNotesModel.getStudent(req.db);
  res.json(result);
}

async function getLesson(req, req) {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  const result = await studentNotesModel.getLesson(req.db);
  res.json(result);
}

module.exports = {
  getAllStudentNotes,
  postStudentNotes,
  getStudentNotes,
  putStudentNotes,
  removeStudentNotes,
  getTeachers,
  getClass,
  getStudent,
  getLesson,
};

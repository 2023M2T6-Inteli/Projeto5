const express = require("express");
const app = express();
const databaseConnection = require("../middlewares/databaseConnection");
app.use(databaseConnection);
const studentModel = require("../models/studentModel");

async function getAllStudent(req, res) {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  const result = await studentModel.getAllStudent(req.db);
  res.json(result);
}

async function getStudentByClassId(req, res){
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  const result = await studentModel.getStudentByClassId(req.db, [req.params.class_id]);
  res.json(result)
}

async function postStudent(req, res) {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  const result = await studentModel.postStudent(req.db, [
    req.body.name,
    req.body.class_id,
    req.body.call_number,
  ]);
  res.json(result);
}

async function getStudent(req, res) {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  const result = await studentModel.getStudent(req.db, req.params.student_id);
  res.json(result);
}

async function putStudent(req, res) {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  const result = await studentModel.putStudent(req.db, [
    req.body.name,
    req.body.class_id,
    req.body.call_number,
    req.params.student_id,
  ]);
  res.json(result);
}

async function removeStudent(req, res) {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  const result = await studentModel.removeStudent(
    req.db,
    req.params.student_id
  );
  res.json(result);
}

module.exports = {
  getAllStudent,
  postStudent,
  getStudent,
  putStudent,
  removeStudent,
  getStudentByClassId,
};

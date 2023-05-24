const express = require("express");
const app = express();
const databaseConnection = require("../middlewares/databaseConnection");
app.use(databaseConnection);
const teacherModel = require("../models/teacherModel");

async function getAllTeachers(req, res) {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  const result = await teacherModel.getAllTeachers(req.db);
  res.json(result);
}

async function postTeachers(req, res) {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  const result = await teacherModel.postTeachers(req.db, [
    req.body.name,
    req.body.email,
    req.body.password,
  ]);
  res.json(result);
}

async function getTeachers(req, res) {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  const result = await teacherModel.getTeachers(req.db, req.params.teacher_id);
  res.json(result);
}

async function putTeachers(req, res) {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  const result = await teacherModel.putTeachers(req.db, [
    req.body.name,
    req.body.email,
    req.body.password,
    req.params.teacher_id,
  ]);
  res.json(result);
}

async function removeTeachers(req, res) {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  const result = await teacherModel.removeTeachers(
    req.db,
    req.params.teacher_id
  );
  res.json(result);
}

module.exports = {
  getAllTeachers,
  postTeachers,
  getTeachers,
  putTeachers,
  removeTeachers,
};

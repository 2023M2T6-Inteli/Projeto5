const express = require("express");
const app = express();
const databaseConnection = require("../middlewares/databaseConnection");
app.use(databaseConnection);
const classModel = require("../models/classModel");

async function getAllClass(req, res) {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  const result = await classModel.getAllClass(req.db);
  res.json(result);
}

async function postClass(req, res) {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  const result = await classModel.postClass(req.db, [
    req.body.class_title,
    req.body.teacher_id,
  ]);
  res.json(result);
}

async function getClass(req, res) {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  const result = await classModel.getClass(req.db, req.params.class_id);
  res.json(result);
}

async function putClass(req, res) {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  const result = await classModel.putClass(req.db, [
    req.body.class_title,
    req.body.teacher_id,
    req.params.class_id,
  ]);
  res.json(result);
}

async function removeClass(req, res) {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  const result = await classModel.removeClass(req.db, req.params.class_id);
  res.json(result);
}

async function getTeachers(req, res) {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  const result = await classModel.getTeachers(req.db);
  res.json(result);
}

async function getClassesByTeacherId(req, res){
    res.statuscode = 200;
    res.setHeader("Access-Control-Allow-Oringin", "*");
    const teacherId = res.locals.returnJwtVerify.id;
    const result = await classModel.getClassesByTeacherId(req.db, teacherId);
    res.json(result);
}

async function postClassByTeacherId(req, res){
  res.statuscode = 200;
  res.setheadr("Acess-Control-Allow-Oringin", "*");
  const teacherId = res.local.returnJwtVerify.id;
  const result = await classModel.postClassByTeacherId(req.db, [
    req.body.class_title,
    teacherId,
  ]);
  res.json(result);
}
module.exports = {
  getAllClass,
  postClass,
  getClass,
  putClass,
  removeClass,
  getTeachers,
  getClassesByTeacherId,
  postClassByTeacherId
};

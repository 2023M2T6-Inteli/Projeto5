const express = require("express");
const app = express();
const databaseConnection = require("../middlewares/databaseConnection");
app.use(databaseConnection);
const lessonsModel = require("../models/lessonsModel");

async function getAllLessons(req, res) {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  const result = await lessonsModel.getAllLessons(req.db);
  res.json(result);
}

async function postLessons(req, res) {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  const result = await lessonsModel.postLessons(req.db, [
    req.body.class_id,
    req.body.date,
  ]);
  res.json(result);
}

async function getLessons(req, res) {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  const result = await lessonsModel.getLessons(req.db, req.params.lesson_id);
  res.json(result);
}

async function putLessons(req, res) {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  const result = await lessonsModel.putLessons(req.db, [
    req.body.class_id,
    req.body.date,
    req.params.lesson_id,
  ]);
  res.json(result);
}

async function removeLessons(req, res) {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  const result = await lessonsModel.removeLessons(req.db, req.params.lesson_id);
  res.json(result);
}

async function getTeachers(req, res) {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  const result = await lessonsModel.getTeachers(req.db);
  res.json(result);
}

async function getClass(req, res) {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  const result = await lessonsModel.getClass(req.db);
  res.json(result);
}

module.exports = {
  getAllLessons,
  postLessons,
  getLessons,
  putLessons,
  removeLessons,
  getTeachers,
  getClass,
};

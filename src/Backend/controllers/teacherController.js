const express = require("express");
const app = express();
const databaseConnection = require("../middlewares/databaseConnection");
app.use(databaseConnection);
const teacherModel = require("../models/teacherModel");

async function getAll(req, res) {
    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");
    const result = await teacherModel.getAll(req.db);
    res.json(result);
}

async function post(req, res) {
    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");
    const result = await teacherModel.post(req.db, [req.body.name, req.body.email, req.body.password]);
    res.json(result)
}

async function get(req, res) {
    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");
    const result = await teacherModel.get(req.db, req.params.teacher_id);
    res.json(result)
}

async function put(req, res) {
    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");
    const result = await teacherModel.put(req.db, [req.body.name, req.body.email, req.body.password, req.params.teacher_id]);
    res.json(result)
}

async function remove(req, res) {
    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");
    const result = await teacherModel.remove(req.db, req.params.teacher_id);
    res.json(result)
}



module.exports = {
    getAll,
    post,
    get,
    put,
    remove
}





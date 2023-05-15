const express = require("express");
const app = express();
const databaseConnection = require("../middlewares/databaseConnection");
app.use(databaseConnection);
const classModel = require("../models/classModel");

async function getAll(req, res) {
    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");
    const result = await classModel.getAll(req.db);
    res.json(result);
}

async function post(req, res) {
    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");
    const result = await classModel.post(req.db, [req.body.class_title, req.body.teacher_id]);
    res.json(result)
}

async function get(req, res) {
    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");
    const result = await classModel.get(req.db, req.params.class_id);
    res.json(result)
}

async function put(req, res) {
    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");
    const result = await classModel.put(req.db, [req.body.class_title, req.body.teacher_id, req.params.class_id]);
    res.json(result)
}

async function remove(req, res) {
    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");
    const result = await classModel.remove(req.db, req.params.class_id);
    res.json(result)
}



module.exports = {
    getAll,
    post,
    get,
    put,
    remove
}





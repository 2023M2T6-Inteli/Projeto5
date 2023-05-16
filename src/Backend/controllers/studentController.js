const express = require("express");
const app = express();
const databaseConnection = require("../middlewares/databaseConnection");
app.use(databaseConnection);
const studentModel = require("../models/studentModel");

async function getAll(req, res) {
    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");
    const result = await studentModel.getAll(req.db);
    res.json(result);
}

async function post(req, res) {
    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");
    const result = await studentModel.post(req.db, [req.body.name, req.body.class_id, req.body.call_number]);
    res.json(result)
}

async function get(req, res) {
    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");
    const result = await studentModel.get(req.db, req.params.student_id);
    res.json(result)
}

async function put(req, res) {
    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");
    const result = await studentModel.put(req.db, [req.body.name, req.body.class_id, req.body.call_number, req.params.student_id]);
    res.json(result)
}

async function remove(req, res) {
    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");
    const result = await studentModel.remove(req.db, req.params.student_id);
    res.json(result)
}



module.exports = {
    getAll,
    post,
    get,
    put,
    remove
}





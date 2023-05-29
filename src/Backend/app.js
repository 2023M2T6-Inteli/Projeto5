const express = require("express");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const databaseConnection = require("./middlewares/databaseConnection")
const hostname = "127.0.0.1";
const port = 3000;
const app = express();

app.use(express.json());

const teacherRoute = require("./routes/teacher");
const classRoute = require("./routes/class");
const studentRoute = require("./routes/student");
const lessonsRoute = require("./routes/lessons");
const studentNotesRoute = require("./routes/studentNotes");
const studentGradesRoute = require("./routes/studentGrades");

app.use(databaseConnection);

app.use("/teacher", teacherRoute);
app.use("/class", classRoute);
app.use("/student", studentRoute);
app.use("/lessons", lessonsRoute);
app.use("/studentNotes", studentNotesRoute);
app.use("/studentGrades", studentGradesRoute);

app.listen(port, hostname, () => {
  console.log(`Servidor rodando em http://${hostname}:${port}/`);
});

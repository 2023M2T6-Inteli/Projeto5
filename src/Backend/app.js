const express = require("express");
const bodyParser = require("body-parser");
const databaseConnection = require("./middlewares/databaseConnection")
const hostname = "127.0.0.1";
const app = express();
const dotenv = require("dotenv");
dotenv.config({path: __dirname + "/.env"});
app.use(express.json());
const PORT = process.env.PORT;

const registerRoute = require("./routes/register")
const loginRoute = require("./routes/login");
const teacherRoute = require("./routes/teacher");
const classRoute = require("./routes/class");
const studentRoute = require("./routes/student");
const lessonsRoute = require("./routes/lessons");
const studentNotesRoute = require("./routes/studentNotes");
const studentGradesRoute = require("./routes/studentGrades");

app.use(databaseConnection);

app.use("/register", registerRoute);
app.use("/login", loginRoute);
app.use("/teacher", teacherRoute);
app.use("/class", classRoute);
app.use("/student", studentRoute);
app.use("/lessons", lessonsRoute);
app.use("/studentNotes", studentNotesRoute);
app.use("/studentGrades", studentGradesRoute);

app.listen(PORT, hostname, () => {
  console.log(`Servidor rodando em http://${hostname}:${PORT}/`);
});

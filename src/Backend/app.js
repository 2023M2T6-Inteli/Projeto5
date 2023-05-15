const express = require("express");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const databaseConnection = require("./middlewares/databaseConnection");
const hostname = "127.0.0.1";
const port = 3000;
const app = express();
app.use(express.json());
const teacherRoute = require("./routes/teacher");
const classRoute = require("./routes/class")
app.use(databaseConnection);



app.use("/teacher", teacherRoute);
app.use("/class", classRoute)




app.listen(port, hostname, () => {
    console.log(`Servidor rodando em http://${hostname}:${port}/`);
});



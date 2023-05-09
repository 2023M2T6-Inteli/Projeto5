const express = require("express");
require("express-async-errors");
const userRouter = require("./routers/userRouter.js");
const errorHandlingMiddleware = require("./utils/errorHandlingMiddleware.js");

const hostname = "127.0.0.1";
const port = 3000;
const app = express();
app.use(express.json());

app.use(userRouter);
app.use(errorHandlingMiddleware);

app.listen(port, hostname, () => {
    console.log(`Servidor rodando em http://${hostname}:${port}/`);
});

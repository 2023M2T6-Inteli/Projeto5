import express from "express";
import userRouter from "./routers/userRouter.js";

const hostname = "127.0.0.1";
const port = 3000;
const app = express();
app.use(express.json());

app.use(userRouter);

app.listen(port, hostname, () => {
    console.log(`Servidor rodando em http://${hostname}:${port}/`);
});

import bodyParser from "body-parser";
const urlencodedParser = bodyParser.urlencoded({ extended: false });
import { signIn, signUp } from "../controllers/userController";

import { Router } from "express";
const router = Router();

router.post("/sign-up", urlencodedParser, signUp);
router.post("/sign-in", urlencodedParser, signIn);

export default router;

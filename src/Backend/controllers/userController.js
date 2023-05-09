import * as userServices from "../services/userServices.js";

export async function signUp(req, res) {
    const user = {
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
    };
    const confirmPassword = req.body.confirmPassword;

    userServices.validateConfirmPassword(user.password, confirmPassword);
    await userServices.validateNewEmail(user.email);
    await userServices.validateNewUsername(user.username);
    const createdUser = await userServices.insertUser(user);

    res.status(201).send({
        id: createdUser.id,
        email: createdUser.email,
        username: createdUser.username,
    });
}

export async function signIn(req, res) {
    const user = req.body;

    const { id } = await userServices.validatePassword(user);
    const token = await userServices.generateToken(user.email);

    res.status(200).send({ id, token });
}

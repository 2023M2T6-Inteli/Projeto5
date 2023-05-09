const userServices = require("../services/userServices.js");

function signUp(req, res) {
    const user = {
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
    };
    const confirmPassword = req.body.confirmPassword;

    userServices.validateConfirmPassword(user.password, confirmPassword);
    userServices.validateNewEmail(user.email);
    userServices.validateNewUsername(user.username);
    const createdUser = userServices.insertUser(user);

    res.status(201).send({
        id: createdUser.id,
        email: createdUser.email,
        username: createdUser.username,
    });
}

function signIn(req, res) {
    const user = req.body;

    const { id } = userServices.validatePassword(user);
    const token = userServices.generateToken(user.email);

    res.status(200).send({ id, token });
}

module.exports = {
    signUp,
    signIn,
};

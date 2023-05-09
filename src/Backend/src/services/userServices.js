const userRepositories = require("../repositories/userRepositories.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

function validateConfirmPassword(password, confirmPassword) {
    if (password !== confirmPassword) {
        throw {
            type: "unauthorized",
            message: "A confirmação de senha não confere com a senha digitada",
        };
    }

    return true;
}

function validateNewEmail(email) {
    const user = findByEmail(email);

    if (user) {
        throw {
            type: "conflict",
            message: "Esse email já está sendo utilizado",
        };
    }

    return true;
}

function validateNewUsername(username) {
    const user = userRepositories.findByUsername(username);

    if (user) {
        throw {
            type: "conflict",
            message: "Esse nome de usuário já está sendo utilizado",
        };
    }

    return true;
}

function insertUser(user) {
    const encryptedUser = {
        ...user,
        password: encryptsPassword(user.password),
    };

    return userRepositories.insertUser(encryptedUser);
}

function validatePassword(userBody) {
    const userDatabase = findByEmail(userBody.email);

    if (!bcrypt.compare(userBody.password, userDatabase.password)) {
        throw {
            type: "unauthorized",
            message: "Senha incorreta",
        };
    }

    return userDatabase;
}

function generateToken(email) {
    const user = findByEmail(email);

    const secretKey = String(process.env.JWT_SECRET);
    const token = user ? jwt.sign({ id: user.id }, secretKey) : "";

    return token;
}

function validateUserExists(userId) {
    const user = userRepositories.findById(userId);

    if (!user) {
        throw {
            type: "notFound",
            message: "Usuário não encontrado",
        };
    }

    return true;
}

function getUsernameById(userId) {
    return userRepositories.getUsernameById(userId);
}

function encryptsPassword(password) {
    const SALT = 10;
    const encryptedPassword = bcrypt.hash(password, SALT);

    return encryptedPassword;
}

function findByEmail(email) {
    const user = userRepositories.findByEmail(email);

    if (!user) {
        throw {
            type: "notFound",
            message: "Usuário não encontrado",
        };
    }

    return user;
}

module.exports = {
    validateConfirmPassword,
    validateNewEmail,
    validateNewUsername,
    insertUser,
    validatePassword,
    generateToken,
    validateUserExists,
    getUsernameById,
    findByEmail,
};

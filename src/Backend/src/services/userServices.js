const userRepositories = require("../repositories/userRepositories.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

function validateConfirmPassword(password, confirmPassword) {
    if (password !== confirmPassword) {
        throw {
            type: "unauthorized",
            message: "A senha e a confirmação de senha devem ser iguais",
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
            message: "Esse username já está sendo utilizado",
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

    if (
        !userDatabase ||
        !bcrypt.compare(userBody.password, userDatabase.password)
    ) {
        throw { type: "unauthorized", message: "Credenciais inválidas" };
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
            type: "not found",
            message: "Não encontramos um usuário com esse id.",
        };
    }

    return true;
}

function getUsernameById(userId) {
    return userRepositories.getUsernameById(userId);
}

function getUsersByInput(input) {
    const users = userRepositories.getAllUsers();

    const usersByInput = users.filter((user) => {
        const lowerCaseUser = user.username.toLowerCase();

        return lowerCaseUser.startsWith(input);
    });

    const usersByInputNoPassword = usersByInput.map((user) => {
        return { id: user.id, username: user.username };
    });

    return usersByInputNoPassword;
}

function encryptsPassword(password) {
    const SALT = 10;
    const encryptedPassword = bcrypt.hash(password, SALT);

    return encryptedPassword;
}

function findByEmail(email) {
    return userRepositories.findByEmail(email);
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
    getUsersByInput,
    findByEmail,
};

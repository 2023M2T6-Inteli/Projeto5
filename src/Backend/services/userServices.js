import * as userRepositories from "../repositories/userRepository";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export function validateConfirmPassword(password, confirmPassword) {
    if (password !== confirmPassword) {
        throw {
            type: "unauthorized",
            message: "A senha e a confirmação de senha devem ser iguais",
        };
    }

    return true;
}

export async function validateNewEmail(email) {
    const user = await findByEmail(email);

    if (user) {
        throw {
            type: "conflict",
            message: "Esse email já está sendo utilizado",
        };
    }

    return true;
}

export async function validateNewUsername(username) {
    const user = await userRepositories.findByUsername(username);

    if (user) {
        throw {
            type: "conflict",
            message: "Esse username já está sendo utilizado",
        };
    }

    return true;
}

export async function insertUser(user) {
    const encryptedUser = {
        ...user,
        password: await encryptsPassword(user.password),
    };

    return await userRepositories.insertUser(encryptedUser);
}

export async function validatePassword(userBody) {
    const userDatabase = await findByEmail(userBody.email);

    if (
        !userDatabase ||
        !(await bcrypt.compare(userBody.password, userDatabase.password))
    ) {
        throw { type: "unauthorized", message: "Credenciais inválidas" };
    }

    return userDatabase;
}

export async function generateToken(email) {
    const user = await findByEmail(email);

    const secretKey = String(process.env.JWT_SECRET);
    const token = user ? jwt.sign({ id: user.id }, secretKey) : "";

    return token;
}

export async function validateUserExists(userId) {
    const user = await userRepositories.findById(userId);

    if (!user) {
        throw {
            type: "not found",
            message: "Não encontramos um usuário com esse id.",
        };
    }

    return true;
}

export async function getUsernameById(userId) {
    return await userRepositories.getUsernameById(userId);
}

export async function getUsersByInput(input) {
    const users = await userRepositories.getAllUsers();

    const usersByInput = users.filter((user) => {
        const lowerCaseUser = user.username.toLowerCase();

        return lowerCaseUser.startsWith(input);
    });

    const usersByInputNoPassword = usersByInput.map((user) => {
        return { id: user.id, username: user.username };
    });

    return usersByInputNoPassword;
}

async function encryptsPassword(password) {
    const SALT = 10;
    const encryptedPassword = await bcrypt.hash(password, SALT);

    return encryptedPassword;
}

export async function findByEmail(email) {
    return await userRepositories.findByEmail(email);
}

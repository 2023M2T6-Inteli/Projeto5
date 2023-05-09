const database = require("../database/databaseConnection.js");

async function findByEmail(email) {
    const query = "SELECT * FROM Professores WHERE email = ?";
    const [user] = await database.all(query, [email]);
    return user;
}

async function findByUsername(nome) {
    const query = "SELECT * FROM Professores WHERE nome = ?";
    const [user] = await database.all(query, [nome]);
    return user;
}

async function insertUser(user) {
    const query =
        "INSERT INTO Professores (nome, email, senha) VALUES (?, ?, ?)";
    const result = await database.run(query, [
        user.username,
        user.email,
        user.password,
    ]);
    return findByUsername(user.username);
}

async function findById(userId) {
    const query = "SELECT * FROM Professores WHERE id = ?";
    const [user] = await database.all(query, [userId]);
    return user;
}

async function getUsernameById(userId) {
    const user = await findById(userId);
    return user ? user.nome : undefined;
}

async function getAllProfessores() {
    const query = "SELECT * FROM Professores";
    const professores = await database.all(query);
    return professores;
}

module.exports = {
    findByEmail,
    findByUsername,
    insertUser,
    findById,
    getUsernameById,
    getAllProfessores,
};

const databaseConnection = require("../database/databaseConnection.js");

function findByEmail(email) {
    const query = "SELECT * FROM Professores WHERE email = ?";
    const users = databaseConnection.all(query, [email]);
    return users[0];
}

function findByUsername(nome) {
    const query = "SELECT * FROM Professores WHERE nome = ?";
    const users = databaseConnection.all(query, [nome]);
    return users[0];
}

function insertUser(user) {
    const query =
        "INSERT INTO Professores (nome, email, senha) VALUES (?, ?, ?)";
    const result = databaseConnection.run(query, [
        user.username,
        user.email,
        user.password,
    ]);
    return findByUsername(user.username);
}

function findById(userId) {
    const query = "SELECT * FROM Professores WHERE id = ?";
    const users = databaseConnection.all(query, [userId]);
    return users[0];
}

function getUsernameById(userId) {
    const user = findById(userId);
    return user ? user.nome : undefined;
}

function getAllProfessores() {
    const query = "SELECT * FROM Professores";
    const professores = databaseConnection.all(query);
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

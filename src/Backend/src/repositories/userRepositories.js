const database = require("../database/databaseConnection.js");

function findByEmail(email) {
    const query = "SELECT * FROM Professores WHERE email = ?";
    const [user] = database.all(query, [email]);
    return user;
}

function findByUsername(nome) {
    const query = "SELECT * FROM Professores WHERE nome = ?";
    const [user] = database.all(query, [nome]);
    return user;
}

function insertUser(user) {
    const query =
        "INSERT INTO Professores (nome, email, senha) VALUES (?, ?, ?)";
    const result = database.run(query, [
        user.username,
        user.email,
        user.password,
    ]);
    return findByUsername(user.username);
}

function findById(userId) {
    const query = "SELECT * FROM Professores WHERE id = ?";
    const [user] = database.all(query, [userId]);
    return user;
}

function getUsernameById(userId) {
    const user = findById(userId);
    return user ? user.username : undefined;
}

function getAllProfessores() {
    const query = "SELECT * FROM Professores";
    const Professores = database.all(query);
    return Professores;
}

module.exports = {
    findByEmail,
    findByUsername,
    insertUser,
    findById,
    getUsernameById,
    getAllProfessores,
};

function postRegister(db, params) {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO teachers (name, email, password, phone) VALUES (?, ?, ?, ?)",
      params,
      (err) => {
        if(err) {
          reject(err);
        }
        resolve("Cadastro feito com sucesso.");
      }
    );
  });
}

module.exports = {
  postRegister,
};
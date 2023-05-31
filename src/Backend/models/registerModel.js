function postRegister(db, params) {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INFO teachers (name, email, password, phone) VALUES (?, ?, ?, ?)",
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
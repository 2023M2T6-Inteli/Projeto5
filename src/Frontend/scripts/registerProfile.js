// Função para enviar a solicitação de registro para o servidor
function register() {
    const nome = document.getElementById("nome").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirm = document.getElementById("confirm").value;
  
    if (password !== confirm) {
      alert("Senha e confirmação de senha devem ser iguais.");
      return;
    }
  
    const data = new URLSearchParams();
    data.append('name', nome);
    data.append('phone', phone);
    data.append('email', email);
    data.append('password', password);
    data.append('confirmPassword', confirm);
  
    // Enviar a solicitação de registro para o servidor
    fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: data.toString(),
    })
      .then((response) => response.json())
      .then((result) => {
        // Tratar a resposta do servidor
        console.log(result);
        alert(result);
      })
      .catch((error) => {
        console.error(error);
        alert("Ocorreu um erro ao processar a solicitação.");
      });
  }
  
  // Associar a função de registro ao botão "Cadastrar"
  const registerBtn = document.getElementById("register-btn");
  registerBtn.addEventListener("click", register);
  
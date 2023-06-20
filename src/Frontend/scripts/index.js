// Função para enviar a solicitação de login para o servidor
function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    const data = new URLSearchParams();
    data.append('email', email);
    data.append('password', password);
  
    // Enviar a solicitação de login para o servidor
    fetch("http://localhost:3000/login", {
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
        if (result) {
          // Armazenar o token no localStorage
          localStorage.setItem("token", result);
          // Redirecionar para a página de perfil ou qualquer outra página desejada
          window.location.href = "classes.html";
        } 
      })
      .catch(() => {
        alert("Email e/ou senha incorretos.");
      });
  }
  
  // Associar a função de login ao botão "Entrar"
  const loginBtn = document.querySelector(".button-sign-in");
  loginBtn.addEventListener("click", login);
  
  // Função para redirecionar para a página de cadastro
  function redirectToRegister() {
    // Redirecionar para a página de cadastro
    window.location.href = "registerProfile.html";
  }
  
  // Associar a função de redirecionamento ao botão "Cadastre-se"
  const registerBtn = document.querySelector(".button-register");
  registerBtn.addEventListener("click", redirectToRegister);
  
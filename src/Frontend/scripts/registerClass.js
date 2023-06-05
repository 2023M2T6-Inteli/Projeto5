function getTokenFromLocalStorage() {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        return token;
      }
      throw new Error('Token not found in localStorage');
    } catch (error) {
      console.error('Error retrieving token from localStorage:', error);
      throw error;
    }
  }


// Função para enviar a solicitação de registro para o servidor
function register() {
    const class_title = document.getElementById("class_title").value;
    
  
    const data = new URLSearchParams();
    data.append('class_title', class_title);

    const token = getTokenFromLocalStorage();
  
    // Enviar a solicitação de registro para o servidor
    fetch("http://localhost:3000/class/postClassByTeacherId", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`
      },
      body: data.toString(),
    })
      .then((response) => response.json())
      .then((result) => {
        // Tratar a resposta do servidor
        console.log(result);
        alert(result);
        window.location.href = "classes.html"
      })
      .catch((error) => {
        console.error(error);
        alert("Ocorreu um erro ao processar o envio.");
        window.location.href = "classes.html"
      });
}
  
  
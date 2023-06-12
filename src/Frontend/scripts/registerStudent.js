function getClassIdFromUrl() {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get("id");
}

//pegar id da rota e mandar pro back
// pegar o numero do aluno
//ir testando a rota
// talvez seja no backend testa 

const id = getClassIdFromUrl();
console.log(id);

function register() {
  const studentName = document.getElementById("studentName").value;
  console.log(studentName);

  const studentNumber = document.getElementById("studentNumber").value;
  console.log(studentNumber);

  const data = new URLSearchParams();
  data.append("name", studentName);
  data.append("call_number", studentNumber);
  data.append("class_id", id);

  // // Enviar a solicitação de registro para o servidor
  fetch("http://localhost:3000/student/", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: data.toString(),
    }).then((result) => {
    //Tratar a resposta do servidor
    const url = `students.html?id=${id}`;
    location.href = url;
    })
    .catch((error) => {
      console.error(error);
      alert("Ocorreu um erro ao processar o envio.");
      location.href = "students.html";
    });
  }





// Função para obter o valor do parâmetro "id" da URL


function getClassIdFromUrl() {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get('id');
}

const id = getClassIdFromUrl()
console.log(id)

async function fetchStudentsByClassId() {
  try {
    const response = await fetch(
      `http://localhost:3000/student/class/${id}`
    );
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
}

function openRegisterStudent() {
  const url = `registerStudent.html?id=${encodeURIComponent(id)}`;
  window.location.href = url;
}

function addLesson(){
  const url = `classSkills.html?id=${encodeURIComponent(id)}`;
  window.location.href = url;
}

function searchStudentCard() {
  const searchValue = document.querySelector(".inputStudentName").value.trim().toLowerCase();
  if (searchValue === "") {
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      card.style.display = "block";
    });
    return;
  }
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    const studentName = card.querySelector(".student-name").textContent.toLowerCase();
    if (studentName.includes(searchValue)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

function deleteStudent(classId) {
  fetch(`http://localhost:3000/student/${classId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then((response) => response.json())
    .then((result) => {
      alert("Aluno deletada com sucesso");
        window.location.reload();
    })
    .catch((error) => {
      alert("Erro ao deletar");
    });
}

async function fetchAverageClassGrades(classId) {
  try {
    const response = await fetch(
      `http://localhost:3000/studentGrades/getAvg/${classId}`
    );
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.error("Error fetching average student grades:", error);
    throw error;
  }
}

function createDivs(students) {
  const container = document.querySelector("#students-container");

  students.forEach(async (studentsData) => {
    const { id, class_id, name, call_number } = studentsData;
    try {
      const averages = await fetchAverageClassGrades(class_id);
      console.log(averages);

      const div = document.createElement("div");
      div.className = "card";
      div.dataset.classId = id; // Adiciona o ID invisível como atributo data

      const cardHeader = document.createElement("div")
      cardHeader.className = "cardHeader"
  

      const h2 = document.createElement("h2");
      h2.className = "student-name";
      h2.textContent = `${call_number} - ${name}`;
      cardHeader.appendChild(h2);
      const button = document.createElement("button")
      button.className = "delete-student"
      button.textContent = "Excluir"
      cardHeader.appendChild(button)

      button.onclick = (event) => {
        event.stopPropagation();
        deleteStudent(id);
      };

      div.appendChild(cardHeader)

      const competencyNames = [
        "Eu, o outro e nós:",
        "Corpo, gestos e movimentos:",
        "Traços, sons, cores e formas:",
        "Escuta, fala, pensamento e imaginação:",
        "Espaços, tempos, quantidades, relações e transformações:",
      ];
      const competencyColors = ["yellow", "blue", "red", "green", "grey"];

      competencyNames.forEach((competency, index) => {
        
        const competencyDiv = document.createElement("div");
        competencyDiv.className = `competency ${competencyColors[index]}-50`;

        const p = document.createElement("p");
        p.textContent = competency;

        const progressBarDiv = document.createElement("div");
        progressBarDiv.className = `${competencyColors[index]}-100 progress-bar-default`;

        const percentage = averages[`average_grade${index + 1}`] || 0;
        progressBarDiv.style.width = `${percentage * 10}%`;
        competencyDiv.appendChild(progressBarDiv);

        div.appendChild(p);
        div.appendChild(competencyDiv);

        div.addEventListener("click", () => {
          // Ação a ser executada quando a div for clicada
          const studentId = div.dataset.classId; // Obtém o ID do aluno clicado
          const studentName = h2.textContent; // Obtém o nome do aluno clicado

          // Cria um objeto com os dados do aluno
          const studentData = {
            id: studentId,
            name: studentName,
            // adicione outros dados do aluno que você queira incluir
          };

          // Serializa os dados do aluno em uma string JSON
          const studentDataString = JSON.stringify(studentData);

          // Codifica a string JSON para ser incluída na URL
          const encodedStudentData = encodeURIComponent(studentDataString);

          // Redirecionar para a página studentsNotes.html com os dados do aluno como parâmetro na URL
          const url = `studentsNotes.html?data=${encodedStudentData}`;
          window.location.href = url;
        });
      });

      container.appendChild(div);
    } catch (error) {
      console.error("Error creating divs:", error);
    }
    
  });
}

// ...

// Coletando o ID da sala da URL
const classId = getClassIdFromUrl();

// Construindo a URL com o ID da sala
var url_avg_grade = `http://127.0.0.1:3000/studentGrades/getAvg/${classId}`;

// Dicionário dos códigos
var codeDictionary = {
  "average_grade1": "EI03EO",
  "average_grade2": "EI03CG",
  "average_grade3": "EI03TS",
  "average_grade4": "EI03EF",
  "average_grade5": "EI03ET"
};

// Realizando a requisição utilizando o fetch
fetch(url_avg_grade)
  .then(function(response) {
    return response.json();
  })
  .then(function(jsonData) {
    // Encontrando a menor nota
    var minGrade = Infinity;
    var minGradeCode = "";

    for (var key in jsonData) {
      if (jsonData[key] < minGrade) {
        minGrade = jsonData[key];
        minGradeCode = key;
      }
    }

    // Obtendo o código correspondente à menor nota
    var minGradeCodeValue = codeDictionary[minGradeCode];

    // Chama a função getContents com os parâmetros SUBJECT e HITS
    getContents(minGradeCodeValue, 35).then((contents) => {
      const coursesContainer = document.querySelector('#courses-container');
  
      // Para cada elemento do array contents, cria um novo elemento e adiciona ao container
      contents.forEach(element => {
          // Criação do elemento de âncora
          const anchor = document.createElement('a');
          anchor.href = element.url;
          anchor.target = "_blank"; // Abrir em nova aba
          anchor.classList.add('course-card');
          coursesContainer.appendChild(anchor);
  
          // Criação da imagem
          const image = document.createElement('img');
          image.src = element.thumbnail;
          image.alt = 'Imagem';
          anchor.appendChild(image);
  
          // Criação do título do card
          const cardTitle = document.createElement('div');
          cardTitle.classList.add('course-card-title');
          cardTitle.textContent = element.titulo;
          anchor.appendChild(cardTitle);
  
          // Criação do container vazio
          const cardContainer = document.createElement('div');
          cardContainer.id = 'card-container';
          anchor.appendChild(cardContainer);
      });
  });
  
  
  
  })
  .catch(function(error) {
    console.log("Ocorreu um erro:", error);
  });

// Função para obter hits aleatórios do Algolia
async function getContents(subject, totalHits) {
  const response = await fetch(`https://6I7NDWQ9YU-dsn.algolia.net/1/indexes/conteudo-pane-teste?query=${subject}&hitsPerPage=${totalHits}`, {
    method: 'GET',
    headers: {
      'X-Algolia-Application-Id': '6I7NDWQ9YU',
      'X-Algolia-API-Key': '459b8ac86fdd4dc47c31095c2dd12e2f'
    }
  });
  const json = await response.json();
  const shuffledHits = shuffle(json.hits);
  const selectedHits = shuffledHits.slice(0, 6);
  return selectedHits;
}

// Função para embaralhar um array (método de Fisher-Yates)
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

 async function initialize() {
   try {
     const classes = await fetchStudentsByClassId();
     createDivs(classes);
   } catch (error) {
     console.error("Error initializing:", error);
   }
 }

 // Chama a função principal para iniciar o processo
 document.addEventListener("DOMContentLoaded", initialize);


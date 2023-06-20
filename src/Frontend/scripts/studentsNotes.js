function goBack() {
  window.history.back();
}

function getStudentDataFromUrl() {
  const searchParams = new URLSearchParams(window.location.search);
  const encodedStudentData = searchParams.get("data");
  const decodedStudentData = decodeURIComponent(encodedStudentData);
  return JSON.parse(decodedStudentData);
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
    return data;
  } catch (error) {
    console.error("Error fetching average class grades:", error);
    throw error;
  }
}

async function createDivs(studentData) {
  const container = document.querySelector("#students-container");

  try {
    const { id, name } = studentData;
    const averages = await fetchAverageClassGrades(id);

    const div = document.createElement("div");
    div.className = "card";
    div.dataset.classId = id;

    const cardHeader = document.createElement("div");
    cardHeader.className = "cardHeader";

    const h2 = document.createElement("h2");
    h2.className = "student-name";
    h2.textContent = name;
    cardHeader.appendChild(h2);

    const button = document.createElement("button");
    button.className = "delete-student";
    button.textContent = "Excluir";
    cardHeader.appendChild(button);

    button.onclick = (event) => {
      event.stopPropagation();
      deleteStudent(id);
    };

    div.appendChild(cardHeader);

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
    });

    container.appendChild(div);
  } catch (error) {
    console.error("Error creating divs:", error);
  }
}

async function initialize() {
  try {
    const studentData = getStudentDataFromUrl();
    createDivs(studentData);
  } catch (error) {
    console.error("Error initializing:", error);
  }
}

// Chama a função principal para iniciar o processo
document.addEventListener("DOMContentLoaded", initialize);

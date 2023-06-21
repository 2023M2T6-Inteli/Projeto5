function goBack() {
  window.history.back();
}

function getStudentDataFromUrl() {
  const searchParams = new URLSearchParams(window.location.search);
  const encodedStudentData = searchParams.get("data");
  const decodedStudentData = decodeURIComponent(encodedStudentData);
  console.log(encodedStudentData)
  return JSON.parse(decodedStudentData);
}

/*async function fetchStudentsByClassId() {
  try {
    const response = await fetch(`http://localhost:3000/student/class/${id}`);
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
}*/

async function fetchAverageStudentGrades(studentId) {
  try {
    const response = await fetch(
      `http://localhost:3000/studentGrades/getAvg/${studentId}`
    );
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const data = await response.json();

    console.log(data)
    
    return data;
  } catch (error) {
    console.error("Error fetching average students grades:", error);
    throw error;
  }
}



function getStudentIdFromUrl() {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get("id");
}

function postStudentGrade() {
  const grades = {
    grade1: document.getElementById("grade1").value,
    grade2: document.getElementById("grade2").value,
    grade3: document.getElementById("grade3").value,
    grade4: document.getElementById("grade4").value,
    grade5: document.getElementById("grade5").value,
  };

  const studentId = getStudentDataFromUrl();

  const data = new URLSearchParams(grades).toString();
  console.log(data);

  fetch(`http://localhost:3000/studentGrades/class/${studentId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      
    },
    body: data,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // Aqui você pode lidar com a resposta do back-end
      // Faça qualquer ação necessária após a postagem das notas
      // Por exemplo, redirecionar para outra página:
      window.location.href = `students.html?id=${encodeURIComponent(studentId)}`;
    })
    .catch((error) => {
      console.error(error);
    });
}

async function createDivs(studentData) {

  const h1 = document.querySelector(".name")

  const { id, name} = studentData

  const h2 = document.createElement("h2")

  h2.className = "student-name";
  h2.textContent = name;

  h1.appendChild(h2)

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

// Função para obter o token do localStorage
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
  
  // Função para enviar a solicitação para obter as salas do servidor
  async function fetchClassesByTeacherId() {
    try {
      const token = getTokenFromLocalStorage();
      const response = await fetch('http://localhost:3000/class/classByTeacherId', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      const data = await response.json();
      console.log(data)
      return data;
    } catch (error) {
      console.error('Error fetching classes:', error);
      throw error;
    }
  }
  
  // Função para obter as médias de notas da sala
  async function fetchAverageClassGrades(classId) {
    try {
      const response = await fetch(`http://localhost:3000/studentGrades/getAvg/${classId}`);
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching average class grades:', error);
      throw error;
    }
  }
  
  // Função para criar as divs dinamicamente com base nas porcentagens
  function createDivs(classes) {
    const container = document.querySelector('#container');

    classes.forEach(async (classData) => {
        const { id, class_title, teacher_id } = classData;
        try {
            const averages = await fetchAverageClassGrades(id);

            const div = document.createElement('div');
            div.className = 'card';

            const h2 = document.createElement('h2');
            h2.className = 'class-name';
            h2.textContent = class_title;
            div.appendChild(h2);

            const competencyNames = [
                'Eu, o outro e nós:',
                'Corpo, gestos e movimentos:',
                'Traços, sons, cores e formas:',
                'Escuta, fala, pensamento e imaginação:',
                'Espaços, tempos, quantidades, relações e transformações:'
            ];
            const competencyColors = ['yellow', 'blue', 'red', 'green', 'grey'];

            competencyNames.forEach((competency, index) => {
                const competencyDiv = document.createElement('div');
                competencyDiv.className = `competency ${competencyColors[index]}-50`;

                const p = document.createElement('p');
                p.textContent = competency;

                const progressBarDiv = document.createElement('div');
                progressBarDiv.className = `${competencyColors[index]}-100 progress-bar-default`;

                const percentage = averages[`average_grade${index + 1}`] || 0;
                progressBarDiv.style.width = `${percentage * 10}%`;
                competencyDiv.appendChild(progressBarDiv);

                div.appendChild(p);
                div.appendChild(competencyDiv);
            });

            container.appendChild(div);
        } catch (error) {
            console.error('Error creating divs:', error);
        }
    });
}


  
  // Função principal para obter as classes e criar as divs
  async function initialize() {
    try {
      const classes = await fetchClassesByTeacherId();
      createDivs(classes);
    } catch (error) {
      console.error('Error initializing:', error);
    }
  }
  
  // Chama a função principal para iniciar o processo
  document.addEventListener('DOMContentLoaded', initialize);

  
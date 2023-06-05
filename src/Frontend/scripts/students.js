// Coletando a pior nota 
// URL da rota do backend
var url_avg_grade = 'http://127.0.0.1:3000/studentGrades/getAvg/10';

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

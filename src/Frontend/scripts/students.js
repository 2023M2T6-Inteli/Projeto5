// Coletando a pior nota 
// URL da rota do backend
var url_bd = 'http://127.0.0.1:3000/studentGrades/getAvg/10';

// Dicionário dos códigos
var codeDictionary = {
  "average_grade1": "EI03EO",
  "average_grade2": "EI03CG",
  "average_grade3": "EI03TS",
  "average_grade4": "EI03EF",
  "average_grade5": "EI03ET"
};

// Realizando a requisição utilizando o fetch
fetch(url_bd)
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

    // Exibindo o código da pior average grade
    console.log("Código da pior average grade:", minGradeCodeValue);

    // Algolia
    const SUBJECT = minGradeCodeValue;  // Assunto para pesquisar baseado na pior nota
    const HITS = 5;             // Número de hits a retornar

    // Chama a função getContents com os parâmetros SUBJECT e HITS
    getContents(SUBJECT, HITS).then((contents) => {
        // Para cada elemento do array contents, imprime o título e a URL
        contents.forEach(element => {
            console.log(element.titulo);
            console.log(element.url);
            console.log(element.thumbnail);
        });
    });
  })
  .catch(function(error) {
    console.log("Ocorreu um erro:", error);
  });

// Função para obter os conteúdos do Algolia
async function getContents(subject, hits) {
    // fetch na URL de busca do Algolia com query params
    const response = await fetch(`https://6I7NDWQ9YU-dsn.algolia.net/1/indexes/conteudo-pane-teste?query=${subject}&hitsPerPage=${hits}`, {
        method: 'GET',
        headers: {
            // Headers necessários para autenticação no Algolia
            'X-Algolia-Application-Id': '6I7NDWQ9YU',
            'X-Algolia-API-Key': '459b8ac86fdd4dc47c31095c2dd12e2f'
        }
    });
    // Transforma a resposta em JSON
    const json = await response.json();
    // Retorna o array de hits
    return json.hits;
}
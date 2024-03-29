# Inteli - Instituto de Tecnologia e Liderança 

<p align="center">
<a href= "https://www.inteli.edu.br/"><img src="https://www.inteli.edu.br/wp-content/uploads/2021/08/20172028/marca_1-2.png" alt="Inteli - Instituto de Tecnologia e Liderança" border="0"></a>
</p>

# Nova Professora

## Anthill

## Integrantes: 
- [Breno Santana de Lima](https://www.linkedin.com/in/breno-santana-4a1912228/)
- [Gabriel Farias Alves](https://www.linkedin.com/in/gabriel-farias-alves/)
- [Hugo Noyma Povoleri](https://www.linkedin.com/in/hugo-noyma/)
- [Leandro dos Santos Gomes](https://www.linkedin.com/in/leandro-dos-santos-gomes/)
- [Moyses Birman Anijar](https://www.linkedin.com/in/moyses-birman-anijar-884648231/)
- [Raul Rezende Szpak](https://www.linkedin.com/in/raul-rezende-szpak-642079186/)
- [Vitto Mazeto](https://www.linkedin.com/in/vitto-mazeto/)

- ## Orientador:
- <a href="https://www.linkedin.com/in/fabiana-martins-de-oliveira-8993b0b2/">Fabiana Martins de Oliveira</a>

## 📝 Descrição

A solução proposta é o desenvolvimento de uma ferramenta web-app chamada Nova Professora, que funciona como um diário digital para professores registrarem e acompanharem informações sobre alunos e turmas. A ferramenta utiliza uma interface baseada nos conceitos de "pipes" e "cartões" do kanban digital, e incorpora rituais ágeis para facilitar a organização dos professores. Além disso, oferece feedbacks rápidos e precisos sobre o desempenho dos alunos, com um sistema inteligente que mapeia habilidades e defasagens individuais, sugerindo conteúdos adequados. O objetivo principal é fornecer uma solução ágil e mensurável para professores, permitindo uma avaliação efetiva das necessidades e avanços dos alunos. A ferramenta visa melhorar a qualidade da educação infantil e contribuir para o desenvolvimento integral dos alunos.

## 📁 Estrutura de pastas

|--> documentos<br>
  &emsp;| --> outros <br>
  &emsp;| T6_G5_V01_Web_application_document.pdf<br>
  &emsp;| T6_G5_V01_Web_application_document.docx<br>
|--> imagens<br>
|--> src<br>
  &emsp;|--> Backend<br>
  &emsp;|--> Frontend<br>
| readme.md<br>
| license.txt

Dentre os arquivos presentes na raiz do projeto, definem-se:

- <b>readme.md</b>: arquivo que serve como guia e explicação geral sobre o projeto (o mesmo que você está lendo agora).

- <b>documentos</b>: aqui estarão todos os documentos do projeto. Há também uma pasta denominada <b>outros</b> onde estão presentes aqueles documentos complementares ao <b>web application document</b>.

- <b>imagens</b>: imagens relacionadas ao projeto como um todo (por exemplo imagens do sistema, do grupo, logotipos e afins).

- <b>src</b>: nesta pasta encontra-se todo o código fonte do sistema (existem duas subpastas <b>backend</b> e <b>frontend</b> que contêm, respectivamente, o código do servidor e o código da página web).


## 💻 Configuração do Ambiente de Desenvolvimento

Aqui estão todas as instruções necessárias para a instalação de todos os programas, bibliotecas e ferramentas imprescindíveis para a configuração do ambiente de desenvolvimento.

1. Baixar e instalar o Node.js: [https://nodejs.org/pt-br/](https://nodejs.org/pt-br/) (versão 16.15.1 LTS)
2. Clone o repositório em questão.
3. Criar um file ".env" dentro de backend, definindo a porta e seu JWT, um token para a segurança do usuário na aplicação. Segue um exemplo de um arquivo .env para montar o seu:
   
```terminal
PORT=3000
JWT_SECRET='secret'
```

4. No modo administrador, abra o "prompt de comando" ou o "terminal" e, após, abra a pasta "src/backend" no diretório raiz do repositório clonado e digite o segundo comando:

```terminal
npm install
```

Isso instalará todas as dependências definidas no arquivo package.json que são necessárias para rodar o projeto. Agora o projeto já está pronto para ser modificado. Caso ainda deseje iniciar a aplicação, digite o comando abaixo no terminal:

```terminal
node app.js
```

5. Agora você pode acessar a aplicação através do link [http://localhost:3000/](http://localhost:3000/).
O servidor está online.

## Bibliotecas Utilizadas

Abordando brevemente as bibliotecas utilizadas no projeto:

```json
{
"name": "backend",
"version": "1.0.0",
"description": "",
"main": "app.js",
"scripts": {
 "test": "echo \"Error: no test specified\" && exit 1"
},
"keywords": [],
"author": "",
"license": "ISC",
"dependencies": {
 "bcrypt": "^5.1.0",
 "body-parser": "^1.20.2",
 "cors": "^2.8.5",
 "dotenv": "^16.1.1",
 "express": "^4.18.2",
 "jsonwebtoken": "^8.5.1",
 "sqlite3": "^5.1.6"
}
}

```
Essas bibliotecas são instaladas automaticamente quando você executa o comando npm install. Alguns exemplos das bibliotecas utilizadas são:

1. bcrypt: Uma biblioteca para criptografia de senhas.
2. body-parser: Uma biblioteca para análise de corpos de solicitação HTTP.
3. cors: Uma biblioteca para lidar com políticas de compartilhamento de recursos entre origens (CORS).
4. dotenv: Uma biblioteca para carregar variáveis de ambiente a partir de um arquivo .env.
5. express: Um framework web para construir aplicativos e APIs com Node.js.
6. jsonwebtoken: Uma biblioteca para geração e verificação de tokens de autenticação JSON Web.
7. sqlite3: Um driver para interagir com bancos de dados SQLite.

## 🗃 Histórico de lançamentos

* 1.0 - 04/05/2023
    * Adição do banco de dados
* 2.0 - 11/05/2023
    * CRUD para a tabela Professores
    * CRUD para a tabela Turmas
* 3.0 - 26/05/2023
    * Finalização do CRUD para todas as tabelas
    * Telas do front
    * Padronização do CSS
    * Inicio da configuração do token JWT

## 📋 Licença/License

<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"><p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><a property="dct:title" rel="cc:attributionURL" href="https://github.com/Spidus/Teste_Final_1">MODELO GIT INTELI</a> by <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://github.com/2023M2T6-Inteli/Projeto5">Inteli, Breno Santana, Gabriel Alves, Hugo Povoleri, Leandro Gomes, Moyses Anijar, Raul Szpak, Vitto Mazeto</a> is licensed under <a href="http://creativecommons.org/licenses/by/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">Attribution 4.0 International</a>.</p>

## 🎓 Referências

Aqui estão as referências usadas no projeto:

1. <https://creativecommons.org/share-your-work/>

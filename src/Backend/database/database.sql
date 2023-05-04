CREATE TABLE Professores (
	id integer PRIMARY KEY AUTOINCREMENT,
	nome text,
	email text,
	senha text
);

CREATE TABLE Alunos (
	id integer PRIMARY KEY AUTOINCREMENT,
	nome text,
	turma_id integer,
	numero_chamada integer
);

CREATE TABLE Turmas (
	id integer PRIMARY KEY AUTOINCREMENT,
	titulo_turma text,
	professor_id integer
);

CREATE TABLE Alunos_Notas (
	id integer PRIMARY KEY AUTOINCREMENT,
	aluno_id integer,
	aula_id integer,
	nota1 integer,
	nota2 integer,
	nota3 integer,
	nota4 integer,
	nota5 integer
);

CREATE TABLE Aulas (
	id integer PRIMARY KEY AUTOINCREMENT,
	turma_id integer,
	data date
);

CREATE TABLE Alunos_Anotacoes (
	id integer,
	aluno_id integer,
	anotacao text,
	aula_id text
);

CREATE TABLE Códigos (
	id integer PRIMARY KEY AUTOINCREMENT,
	codigo text,
	categoria_id integer
);

CREATE TABLE Categorias (
	id integer PRIMARY KEY AUTOINCREMENT,
	titulo text
);
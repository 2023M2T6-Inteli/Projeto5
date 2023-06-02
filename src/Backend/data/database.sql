CREATE TABLE teachers (
	id integer PRIMARY KEY AUTOINCREMENT,
	name text,
	email text,
	password text,
	phone text
);

CREATE TABLE students (
	id integer PRIMARY KEY AUTOINCREMENT,
	name text,
	class_id integer,
	call_number integer,
	FOREIGN KEY (class_id) REFERENCES classes(id)
);

CREATE TABLE classes (
	id integer PRIMARY KEY AUTOINCREMENT,
	class_title text,
	teacher_id integer,
	FOREIGN KEY (teacher_id) REFERENCES teachers(id)
);

CREATE TABLE student_grades (
	id integer PRIMARY KEY AUTOINCREMENT,
	student_id integer,
	lesson_id integer,
	grade1 integer,
	grade2 integer,
	grade3 integer,
	grade4 integer,
	grade5 integer,
	FOREIGN KEY (student_id) REFERENCES students(id),
	FOREIGN KEY (lesson_id) REFERENCES lessons(id)
);

CREATE TABLE lessons (
	id integer PRIMARY KEY AUTOINCREMENT,
	class_id integer,
	date date,
	FOREIGN KEY (class_id) REFERENCES classes(id)
);

CREATE TABLE student_notes (
	id integer PRIMARY KEY AUTOINCREMENT,
	student_id integer,
	note text,
	lesson_id integer,
	FOREIGN KEY (student_id) REFERENCES students(id),
	FOREIGN KEY (lesson_id) REFERENCES lessons(id)
);

CREATE TABLE codes (
	id integer PRIMARY KEY AUTOINCREMENT,
	code text,
	category_id integer,
	FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE categories (
	id integer PRIMARY KEY AUTOINCREMENT,
	title text
);
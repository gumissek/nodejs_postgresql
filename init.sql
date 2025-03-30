DROP TABLE IF EXISTS books;
CREATE TABLE books (
	id SERIAL PRIMARY KEY,
	title TEXT UNIQUE NOT NULL,
	author TEXT NOT NULL,
	description TEXT NOT NULL,
	isbn TEXT NOT NULL,
	review TEXT NOT NULL,
	rating INT NOT NULL
);
INSERT INTO books (title,author,description,isbn,review,rating) 
VALUES ('Dziady III','Adam Mickiewicz','Lektura szkolna taka i taka lorem ipsum','brak','dostalem szmate :3',6)
,('Harry Potter i Kamien filozoficzny','J.K. Rowling','Historia o chłopcu czarodzieju','9788382654462','Lubie do tego wracac',10);
;


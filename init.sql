DROP TABLE IF EXISTS books;
CREATE TABLE books (
	id SERIAL PRIMARY KEY,
	title TEXT UNIQUE NOT NULL,
	author TEXT NOT NULL,
	description TEXT NOT NULL,
	img_link TEXT NOT NULL,
	review TEXT NOT NULL,
	rating INT NOT NULL
);
INSERT INTO books (title,author,description,img_link,review,rating) 
VALUES ('Dziady III','Adam Mickiewicz','Lektura szkolna taka i taka lorem ipsum taka lorem ipsumtaka lorem ipsumtaka lorem ipsumtaka lorem ipsumtaka lorem ipsumtaka lorem ipsumtaka lorem ipsumtaka lorem ipsumtaka lorem ipsumtaka lorem ipsumtaka lorem ipsum','https://wolnelektury.pl/media/book/cover_clean/dziady-dziady-poema-dziady-czesc-iii_rSHPOVu.jpg','dostalem najlepsza ocene :3',8)
,('Harry Potter i Kamien filozoficzny','J.K. Rowling','Historia o chłopcu czarodzieju','https://ecsmedia.pl/cdn-cgi/image/format=webp,width=544,height=544,/c/harry-potter-i-kamien-filozoficzny-edycja-jubileuszowa-b-iext179282901.jpg','Lubie do tego wracac',10);



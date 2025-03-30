// OK buduje strone gdzie do bazy danych bede mogl dodawac , ksizaki
// OK baza danych 
// OK tabela ksiazki id, tytul, autor, moja recenzja , krotki opis , ocena, isbn-13 kod jakis ksiazki jako PRIMARY KEY

// uzycie api do pobrania okladki ksiazki 

//https://www.postman.com/cs-demo/public-rest-apis/request/axmdplg/covers
// open library api to get cover
// funkcja do pobierania ksiazek z bazy danych zwraca liste
// strona add bookk do dodawania ksiazek sprawdza czy taki isbn jest w bazie
// express 
// body-parser
// pg
// axios
// ejs
// potem jakis front do tego i super

import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import pg from 'pg';


const app = express();
const port = 5001;


const db = new pg.Client({
    user:'postgres',
    password:'12345',
    host:'localhost',
    database:'books',
    port:5432,
});
db.connect();

// await db.query("DROP TABLE IF EXISTS books;CREATE TABLE books (id SERIAL PRIMARY KEY,title TEXT UNIQUE NOT NULL,author TEXT NOT NULL,description TEXT NOT NULL,isbn TEXT NOT NULL,review TEXT NOT NULL,rating INT NOT NULL);INSERT INTO books (title,author,description,isbn,review,rating) VALUES ('Dziady III','Adam Mickiewicz','Lektura szkolna taka i taka lorem ipsum','brak','dostalem szmate :3',6),('Harry Potter i Kamien filozoficzny','J.K. Rowling','Historia o chłopcu czarodzieju','9788382654462','Lubie do tego wracac',10);;");


// MIDDLEWARE
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

// FUNCTIONS
async function getBooksCollection() {
    let bookList=[];
    let result = await db.query('SELECT * FROM books');
    result.rows.forEach(element => {
        let book={
            id:element.id,
            title:element.title,
            author:element.author,
            description:element.description,
            isbn:element.isbn,
            review:element.review,
            rating:element.rating
        };
        bookList.push(book);
    });
    return bookList;
}



// ROUTES 
app.get('/',async (req,res)=>{
    const books=await getBooksCollection();
    console.log(books);
    res.render('index.ejs',{books:books});
});

app.post('/addBook',async (req,res)=>{
    let author = req.body.author;
    let title = req.body.title;
    let description = req.body.description;
    let review = req.body.review;
    let rating = req.body.rating;
    let isbn = req.body.isbn
    try {
        let result = await db.query('SELECT * FROM books WHERE title=$1',[title]);
        if (result.rows.lenght>0) {
            // nie ma ksiazki o takiej nazwie 
        }else{

        };
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});




app.listen(port,()=>{
    console.log(`App is working on http://localhost:${port}`)
});


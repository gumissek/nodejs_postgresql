
// uzycie api do pobrania okladki ksiazki 

//https://www.postman.com/cs-demo/public-rest-apis/request/axmdplg/covers
// open library api to get cover

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

await db.query("DROP TABLE IF EXISTS books;CREATE TABLE books (id SERIAL PRIMARY KEY,title TEXT UNIQUE NOT NULL,author TEXT NOT NULL,description TEXT NOT NULL,img_link TEXT NOT NULL,review TEXT NOT NULL,rating INT NOT NULL);INSERT INTO books (title,author,description,img_link,review,rating) VALUES ('Dziady III','Adam Mickiewicz','Lektura szkolna taka i taka lorem ipsum','https://wolnelektury.pl/media/book/cover_clean/dziady-dziady-poema-dziady-czesc-iii_rSHPOVu.jpg','dostalem szmate :3',6),('Harry Potter i Kamien filozoficzny','J.K. Rowling','Historia o chłopcu czarodzieju','https://ecsmedia.pl/cdn-cgi/image/format=webp,width=544,height=544,/c/harry-potter-i-kamien-filozoficzny-edycja-jubileuszowa-b-iext179282901.jpg','Lubie do tego wracac',10);;");


// MIDDLEWARE
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

let sortBy = 'rating';
let ascdesc = 'DESC';
// FUNCTIONS
async function getBooksCollection() {
    let bookList=[];
    let result = await db.query(`SELECT * FROM books ORDER BY ${sortBy} ${ascdesc}`);
    result.rows.forEach(element => {
        let book={
            id:element.id,
            title:element.title,
            author:element.author,
            description:element.description,
            img_link:element.img_link,
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
    // console.log(books);
    res.render('index.ejs',{books:books});
});

app.post('/addBook',async (req,res)=>{
    let author = String(req.body.author).trim();
    let title = String(req.body.title).trim();
    let description = String(req.body.description).trim();
    let review = String(req.body.review).trim();
    let rating = req.body.rating;
    let img_link = String(req.body.img_link).trim();
    const books= await getBooksCollection();
    try {
        let result = await db.query('SELECT * FROM books WHERE title=$1',[title]);
        // console.log(result.rows)
        if (result.rows.length>0) {
            console.log('Jest taka ksiazka, nie dodajemy do bazy')
            res.render('index.ejs',{books:books,error:'That book already exists in your shelf.'});
        }else{
            await db.query(`INSERT INTO books (title,author,description,img_link,review,rating) VALUES ($1,$2,$3,$4,$5,$6)`
                ,[title,author,description,img_link,review,rating]);
            res.redirect('/');
        };
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

app.post('/deleteBook',async (req,res)=>{
    let bookId = req.body.deleteBookId;

    try {
        await db.query('DELETE FROM books WHERE id=$1',[bookId]);
        const books =  await getBooksCollection();
        res.render('index.ejs',{books:books,error:'Book has been deleted from shelf.'});
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

app.post('/sort',(req,res)=>{
    let sort = String(req.body.sorting).split('_')[0].toLowerCase();
    let asc_desc = String(req.body.sorting).split('_')[1].toLocaleUpperCase();
    sortBy=sort;
    ascdesc=asc_desc;
    res.redirect('/');
});

app.post('/edit', async (req,res)=>{
    let bookId = req.body.updatedId;
    let newReview = String(req.body.updatedReview).trim();
    let newRating=req.body.updatedRating;

    try {
        await db.query(`UPDATE books SET review=$1,rating=$2 WHERE id=$3`,[newReview,newRating,bookId]);
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }


});


app.listen(port,()=>{
    console.log(`App is working on http://localhost:${port}`)
});


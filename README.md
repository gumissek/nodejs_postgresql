1. download the project git clone https://github.com/gumissek/nodejs_postgresql.git

2. change your details to database in index.js
const db = new pg.Client({
    user:'postgres',
    password:'YOUR PASSWORD',
    host:'localhost',
    database:'YOUR DATABASE',
    port:5432,
});

3. open terminal in downloaded folder then type npm i

4. open browser http://localhost:5001
5. Make your collection
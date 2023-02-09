const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();


var cors = require('cors');
app.use(cors());


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bmi'
});
//  ******--- creating database --- *******

// connection.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     con.query("CREATE DATABASE bmi", function (err, result) {
//       if (err) throw err;
//       console.log("Database created");
//     });
//   });

// ******** creating table history ***********

// connection.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     var sql = "CREATE TABLE history (name VARCHAR(20),age varchar(20) , weight varchar(20) , height varchar(20) , bmi varchar(20))";
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("Table created");
//     });
//   });


// ******** insert values *********

// connection.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     var sql = "INSERT INTO history ( name ,age , weight  , height  , bmi ) VALUES ('geroge', '20' ,'55' , '1.75' , '18.6')";
//     connection.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("1 record inserted");
//     });
//   });  

// ****** select values  ************

// connection.connect((err) => {
//     if (err) throw err;
//     console.log('Connected to the database');
//     var sql = "select * from historyy"
//     connection.query(sql, function (err, result) {
//         if (err) throw err;
//         console.log("  selected values ", result);

//     });
// });

// app.post('/add', (req, res) => {
//     const data = {
//         name: req.body.name,
//         email: req.body.email
//     };

//     const sql = 'INSERT INTO users SET ?';
//     connection.query(sql, data, (error, results) => {
//         if (error) throw error;
//         res.send('Data added successfully');
//     });
// });

app.get('/api/data', (req, res) => {
    // Query your MySQL database and retrieve the data
    var sql = "select * from historyy"
    connection.query(sql, function (err, result) {
        if (err) throw err;
        // console.log("  selected values ", result);
        console.log(result);
        res.send(result);
    });
});


const port = 3001;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
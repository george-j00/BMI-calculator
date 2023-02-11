const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();


var cors = require('cors');
app.use(cors());


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '1233',
//     database: 'BMI'
// });

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '1233',
    database: 'BMI'
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
//     var sql = "INSERT INTO history ( name ,age , weight  , height  , bmi ) VALUES ('POPS', '20' ,'55' , '1.75' , '18.6')";
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

// ******** post *********** 

// app.post('/api/insert', (req, res) => {
//     const data = {
//         name: req.body.name,
//         age: req.body.age,
//         height: req.body.height,
//         weight: req.body.weight,
//         bmi: req.body.bmi
//     };
//     console.log(data, 'app.post data');

//     connection.connect(function (err) {
//         if (err) throw err;
//         console.log("Connected!");
//     });
//     var sql = "INSERT INTO history ( name ,age , weight  , height  , bmi ) VALUES ('georee', '20' ,'55' , '1.75' , '18.6')";
//     connection.query(sql, function (err, result) {
//         if (err) throw err;
//         console.log("1 record inserted");
//     });
// });

// app.get('/api/data', (req, res) => {
//     // Query your MySQL database and retrieve the data
//     var sql = "select * from history"
//     connection.query(sql, function (err, result) {
//         if (err) throw err;
//         // console.log("  selected values ", result);
//         console.log(result);
//         res.send(result);
//     });
// });
app.post('/api/insert', (req, res) => {

    // const data = { 
    const Name = req.body.name
    const Age = req.body.age
    const Height = req.body.height
    const Weight = req.body.weight
    const Bmi = req.body.bmi
    // };

    pool.getConnection(function (err, connection) {
        var sql = "INSERT INTO history ( name ,age , weight  , height  , bmi ) VALUES (? ,? ,? ,? ,? )";
        connection.query(sql, [Name, Age, Weight, Height, Bmi], function (err, result) {
            connection.release();
            if (err) throw err;
            res.send(JSON.stringify(result));
        });
    });
});

app.get('/api/data', (req, res) => {
    // Query your MySQL database and retrieve the data
    pool.getConnection(function (err, connection) {
        connection.query("select * from history", function (err, result) {
            connection.release();
            if (err) throw err;
            res.send(JSON.stringify(result));
        });
    });
});


const port = 3001;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
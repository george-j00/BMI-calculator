const express = require('express');
const db = require('./config/db')
const cors = require('cors')

const app = express();
const PORT = 3002;
app.use(cors());
app.use(express.json())

// Route to get all posts
app.get("/api/insert", (req, res) => {
    const Name = req.body.name;
    const Age = req.body.age;
    const Weight = req.body.weight;
    const Height = req.body.height;
    const Bmi = req.body.bmi;


    const sqlInsert = 'INSERT INTO BMICALCULATOR {NAME , AGE , HEIGHT , WEIGHT , BMI_SCORE } VALUES {?,?,?,? }'
    db.query(sqlInsert, [Name, Age, Weight, Height, Bmi], (err, result) => { });
    res.send('history');
});



// // Route for creating the post
// app.post('/api/create', (req, res) => {

//     const username = req.body.userName;
//     const title = req.body.title;
//     const text = req.body.text;

//     db.query("INSERT INTO posts (title, post_text, user_name) VALUES (?,?,?)", [title, text, username], (err, result) => {
//         if (err) {
//             console.log(err)
//         }
//         console.log(result)
//     });
// })



// // Route to delete a post

// app.delete('/api/delete/:id', (req, res) => {
//     const id = req.params.id;

//     db.query("DELETE FROM posts WHERE id= ?", id, (err, result) => {
//         if (err) {
//             console.log(err)
//         }
//     })
// })

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})
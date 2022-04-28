const express = require('express');
const port = 5000;
const cors = require('cors');
const mysql = require('mysql');
const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database: 'movies',
  });

const app = express();
const HTTP_PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());

app.get('/movieData', (req, res) => {
    const sqlSelect =
    'SELECT * FROM movieData ORDER BY ID DESC';
  
    db.query(sqlSelect, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.json(result);
        }
})})

app.post('/movieData', (req, res) => {
  db.query('INSERT INTO movieData (movieTitle, director, year, genre) VALUES (?, ?, ?, ?)', [req.body.movieTitle, req.body.director, req.body.year, req.body.genre]
  , (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(req.body);
        res.send(result);
      }
})})

app.get('/limitedMovieData', (req, res) => {
  const sqlSelect =
  'SELECT * FROM movieData ORDER BY ID DESC LIMIT 25';

  db.query(sqlSelect, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json(result);
      }
})})

app.delete('/movieData/:id', (req, res) => {
  var id = req.params.id;
  db.query('DELETE FROM movieData WHERE ID = (?)', [id],
   (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
})})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
  })

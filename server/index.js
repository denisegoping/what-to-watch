import * as express from "express";
const port = 5000;
const cors = require('cors');
const mysql = require('mysql');
const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database: 'musicData',
  });

const app = express();
const HTTP_PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());

app.get('/musicData', (req, res) => {
    const sqlSelect =
    'SELECT * FROM musicData';
  
    db.query(sqlSelect, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.json(result);
        }
})})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
  })

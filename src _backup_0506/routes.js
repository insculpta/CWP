routes = require('./routes')
app.use('/', routes);
const express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const mysql = require('mysql');

const connection = mysql.createPool({
  host     : '140.116.55.208',
  user     : 'newuser',
  password : 'Tt12345678',
  database : 'post'
});

const app = express();

// Creating a GET route that returns data from the 'users' table.
app.get('/users', function (req, res) {
    // Connecting to the database.
    connection.getConnection(function (err, connection) {

    // Executing the MySQL query (select all data from the 'users' table).
    connection.query('SELECT * FROM users', function (error, results, fields) {
      // If some error occurs, we throw an error.
      if (error) throw error;

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results)
    });
  });
});

// Starting our server.
app.listen(3000, () => {
 console.log('Go to http://localhost:3000/users so you can see the data.');
})

router.get('/', function(req, res, next) {
  res.render('hey this worked');
});

router.get('/another/route', function(req, res, next) {
  res.json({ hello: 'world' });
});


export default router;

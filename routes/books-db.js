var express = require('express');
var mysql = require('mysql');
var router = express.Router();
//TODO - require mysql



//TODO - create connection pool
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "book_library"
});

/* GET users listing. */
//TODO - create sql query and run query 
router.get('/', function (req, res, next) {
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    const sql = "SELECT * FROM books";
    connection.query(sql, function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      res.json(result);
    })
  })
  
});

// /books/create 

router.post('/create', function (req, res, next) {
  pool.getConnection(function(err, connection){
    if(err) throw err;
    var title = req.body.title;
    var author = req.body.author;
    const sql = `INSERT INTO books (id, title, author) VALUES (NULL, '${title}', '${author}')`;
    connection.query(sql, function (err, result) {
      connection.release();
       if (err) throw err;
      console.log(result);
      res.json({ success: true });
    })
  });
});

// /books/delete
router.post('/delete', function(req, res, next) {
  var id = req.body.id;

  pool.getConnection(function (err, connection) {
    if (err) throw err;
    const sql = `DELETE FROM books WHERE id=${id}`;
    connection.query(sql, function (err, results) {
      if (err) throw err;
      console.log(results);
      res.json({success: true});
    })
  })
 
  //TODO - create sql query and run query 
  
});
module.exports = router;


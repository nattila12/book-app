var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  var content = fs.readFileSync('public/books.json');
  var books = JSON.parse(content);
  res.json(books);
});


// /books/create 

router.post('/create', function (req, res, next) {
  var title = req.body.title;
  var author = req.body.author;
  var details = req.body.details;
  var id = new Date().getTime();
  
  createBook(id, title, author, details);

  res.json({success: true});
});

router.post('/update', function (req, res, next) {
  var title = req.body.title;
  var author = req.body.author;
  var id = req.body.id;
  var details = req.body.details;

  deleteBook(id);
  createBook(id, title, author, details);

  res.json({success: true});
});

// /books/delete
router.post('/delete', function(req, res, next) {
  var id = req.body.id;

  deleteBook(id);

  res.json({success: true});
});

function createBook(id, title, author, details) {
  var content = fs.readFileSync('public/books.json');
  var books = JSON.parse(content);
  books.push({
    title,
    author,
    id,
    details
  });

  content = JSON.stringify(books, null, 2);
  fs.writeFileSync('public/books.json', content);
}

function deleteBook(id) {
  var content = fs.readFileSync('public/books.json');
  var books = JSON.parse(content);

  var remainingBooks = books.filter(function(book){
    console.log('book.id', book.id);
    console.log('id', id);
    return book.id != id;
  });

  content = JSON.stringify(remainingBooks, null, 2);
  fs.writeFileSync('public/books.json', content);
};


module.exports = router;
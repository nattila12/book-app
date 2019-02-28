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
  var number = req.body.number;
  
  createBook(number, title, author);

  res.json({success: true});
});

router.post('/edit', function (req, res, next) {
  var title = req.body.title;
  var author = req.body.author;
  var number = req.body.number;

  deleteBook(number);
  createBook(number, title, author);

  res.json({success: true});
});

// /books/delete
router.post('/delete', function(req, res, next) {
  var id = req.body.id;

  deleteBook(id);

  res.json({success: true});
});

function createBook(number, title, author) {
  var content = fs.readFileSync('public/books.json');
  var books = JSON.parse(content);
  books.push({
    title,
    author,
    id: number
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
  
  res.json({success: true});
};

// router.post('/update', function (req, res, next) {
//   var title = req.body.title;
//   var author = req.body.author;
//   var oldId = req.body.id;
  
//   var content = fs.readFileSync('public/books.json');
//   var books = JSON.parse(content);

//   var book = books.find(function(book){
//     return book.id == oldId;
//   });

//   book.title = title;
//   book.author = author;
//   book.id = id;
  
//   content = JSON.stringify(books, null, 2);
//   fs.writeFileSync('public/books.json', content);

//   res.json({success: true});
  
// });


module.exports = router;
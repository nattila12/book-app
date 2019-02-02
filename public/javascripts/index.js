

function displayBooks(books){
    console.log('displayBooks', books)
}

function initEvents(){
    console.log('initEvents')
}

function loadBooks(){
    $.ajax('/books.json').done(function(books){
        console.log('books');
        window.globalBooks = books;
        displayBooks(books);
    });

    
    console.log('loadBooks')
    displayBooks();
}

function search(){
    console.log('search')
}

loadBooks();
initEvents();

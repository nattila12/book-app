
function loadBooks(){
    $.ajax('/books.json').done(function(books){
        console.log('books');
        window.globalBooks = books;
        displayBooks(books);
    });

    
    console.log('loadBooks')
}


function displayBooks(books){
    console.log('displayBooks', books)
    var rows = books.map(function(book) {
        console.log('transform book', book);
        return `<tr>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.number}</td>
        </tr>`;
    });
}



function initEvents(){
    console.log('initEvents')
}



function search(){
    console.log('search')
}

loadBooks();
initEvents();



function displayBooks(books){
    console.log('displayBooks', books)
    var rows = books.map(function(book) {
        console.log('transform book', book);
        return `<tr>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.book-nr}</td>
        </tr>`;
    });
    console.warn('rows', rows);
    
    //rows.push(getNewRow()); // simplified
    var actions = getNewRow();
    rows.push(actions);

    document.querySelector('tbody').innerHTML = rows.join('');
}

function getNewRow(){
    return 
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
}

function search(){
    console.log('search')
}

loadBooks();
initEvents();

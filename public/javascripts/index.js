
function loadBooks() {
    $.ajax('/books.json').done(function (books) {
        console.log('books');
        window.globalBooks = books;
        displayBooks(books);
    });
    console.log('loadBooks')
}

function displayBooks(books) {
    console.log('displayBooks', books)
    var rows = books.map(function (book) {
        console.log('transform book', book);
        return `<tr>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.number}</td>
        </tr>`;
    });
    document.querySelector('tbody').innerHTML = rows.join('');
}

function initEvents() {
    console.log('initEvents')
    document.querySelector(".add-books").addEventListener('click', displayForm);
}

function displayForm() {

    var x = document.getElementById("book-form");

    if (x.style.display === "none") {
        x.style.display = "block";
        document.querySelector('.add-books').value = 'Cancel';

    } else {
        x.style.display = "none";
        document.querySelector('.add-books').value = 'Add Books';

    }
}

function search() {
    console.log('search')
}

loadBooks();
initEvents();

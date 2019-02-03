
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
            <td class="text-center">${book.number}</td>
            <td class="text-center"><span class="delete">🗑</span></td>
        </tr>`;
    });
    document.querySelector('tbody').innerHTML = rows.join('');
}

function initEvents() {
    console.log('initEvents')
    document.querySelector(".add-books").addEventListener('click', displayForm);
    document.getElementById('search').addEventListener('input', doSearch);
    document.getElementById('cancel').addEventListener('click', hideForm);
}

function displayForm() {
    var x = document.getElementById("book-form-dialog");
    x.showModal();
}

function hideForm(){
    var x = document.getElementById("book-form-dialog");
    x.close();
}

function doSearch() {
    var value = this.value.toLowerCase();

    var filteredBooks = globalBooks.filter(function (book) {
        return book.title.toLowerCase().includes(value) ||
            book.author.toLowerCase().includes(value) ||
            book.number.toLowerCase().includes(value);
    });

    displayBooks(filteredBooks);
}

loadBooks();
initEvents();



function loadBooks() {
    $.ajax('/books').done(function (books) {
        window.globalBooks = books;
        displayBooks(books);
    });
}

function displayBooks(books) {
    var rows = books.map(function (book) {
        return `<tr>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td class="text-center">${book.id}</td>
            <td class="text-center"><span class="edit" data-id="${book.id}">&#9998;</span></td>
            <td class="text-center"><span class="delete" data-id="${book.id}">🗑</span></td>
        </tr>`
    });
    
    document.querySelector('tbody').innerHTML = rows.join('');
}

function deleteBook(id) {
    $.post('/books/delete', {
        id: id
    }).done(function (response) {
        if (response.success) {
            console.warn('deleted book', response);
            loadBooks();
        }
    })
}

function initEvents() {
    document.querySelector(".add-books").addEventListener('click', displayForm);
    document.getElementById('search').addEventListener('input', doSearch);
    document.getElementById('cancel').addEventListener('click', hideForm);

    $("tbody").delegate(".delete", "click", function (e) {
        var id = this.getAttribute('data-id')
        console.log('delete by id: ', id);

        deleteBook(id);
    });

    $("tbody").delegate(".edit", "click", function (e) {
        var id = this.getAttribute('data-id')
        console.log('edit by id: ', id);

        editBook(id);
    });

}

function editBook(id){
    const selection = getBook(id);
    window.editMode = true;

    displayForm();
    fillForm(selection);
}

function getBook(id) {
    const result = window.globalBooks.filter(element => element.id === id)[0];
    return result;
}

function fillForm(book) {
    $('#book-form #title').val(book.title);
    $('#book-form #author').val(book.author);
    $('#book-form #id').val(book.id);
}

function displayForm() {
    var x = document.getElementById("book-form-dialog");

    x.showModal();

    if (window.editMode) $('#book-form #id').attr('readonly', true);
    else $('#book-form #id').attr('readonly', false);
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
            book.id.toLowerCase().includes(value);
    });

    displayBooks(filteredBooks);
}


function saveBooks() {

    var title = $('input[name=title]').val();
    var author = $('input[name=author]').val();
    var number = $('input[name=id]').val();

    console.debug('edit mode? ' + window.editMode);
    console.debug('saveBook...', title, author, number);

    var actionUrl = '/books/create';
    if (window.editMode) actionUrl = '/books/edit';

    $.post(actionUrl, {
        title, 
        author,
        number: number 
    }).done(function (response) {
        console.warn('operation done', response);
        if (response.success) {
            hideForm();
            loadBooks();
            
            window.editMode = false;
        }
    })
}

loadBooks();
initEvents();


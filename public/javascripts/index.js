 
var idToEdit = '';

function loadBooks() {
    $.ajax('/books').done(function (books) {
        window.globalBooks = books;
        displayBooks(books);
    });
}

function displayBooks(books) {
    var rows = books.map(function (book) {
        return `<tr>
            <td>${book.id}</td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td class="text-center"><span class="edit" data-id="${book.id}" >&#9998;</span></td>
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
    })

    $("tbody").delegate( ".edit", "click", function() {
        idToEdit = this.getAttribute('data-id');

        var book = globalBooks.find(function(book){
            return book.id == idToEdit;
        });
        console.log('edit', idToEdit, book);
        
        displayForm();
        document.querySelector('input[name=title]').value = book.title;
        $('input[name=author]').val(book.author);
        $('input[name=id]').val(book.id);    
    });
}

function displayForm() {
    var x = document.getElementById("book-form-dialog");

    x.showModal();

    if (window.editMode) $('#book-form #id').attr('readonly', true);
    else $('#book-form #id').attr('readonly', false);
}

function hideForm(){
    var x = document.getElementById("book-form-dialog");
    x.close()
    document.getElementById("book-form").reset();
    
}

function doSearch() {
    var value = this.value.toLowerCase();

    var filteredBooks = globalBooks.filter(function (book) {
        return book.title.toLowerCase().includes(value) ||
            book.author.toLowerCase().includes(value) ;
            // book.id.toLowerCase().includes(value);
    });

    displayBooks(filteredBooks);
}

function saveBooks() {

    var title = $('input[name=title]').val();
    var author = $('input[name=author]').val();
    var number = $('input[name=id]').val();

    console.debug('edit mode? ' + window.editMode);
    console.debug('saveBook...', title, author, number);
    
    var actionUrl =  idToEdit ? 'books/update?' : 'books/create';

    $.post(actionUrl, {
        id: idToEdit,
        title, 
        author,
    }).done(function (response) {
        console.warn('done create book', response);
        idToEdit = '';
        if (response.success) {
            hideForm();
            loadBooks();
            
            window.editMode = false;
        }
    });
    
}

loadBooks();
initEvents();


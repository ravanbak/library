let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.getReadString = function() { 
    return this.read ? 'Read' : 'Not read yet';
}

Book.prototype.info = function() { 
    return `${this.title}, ${this.pages} pages, ` + this.getReadString();
}

Book.prototype.toggleRead = function() {
    this.read = !this.read;
    displayBooks();
}

init();

function init() {
    // buttons on main page
    document.querySelector('.btn-add-book').addEventListener('click', addNewBook);

    // buttons on form
    document.querySelector('.frm-add-book__btn-cancel').addEventListener('click', newBookFrmCancel);
    document.querySelector('.frm-add-book').addEventListener('submit', newBookFrmSubmit);

    libraryLoadBookData();
    displayBooks();
}

function libraryAddBook(title, author, pages, read, notes) {
    myLibrary.push(new Book(title, author, pages, read));
}

function libraryRemoveBook(e) {
    const idx = e.target.dataset['idx'];
    if (idx) {
        myLibrary.splice(idx, 1);
    }
    displayBooks();
}

function libraryToggleBookRead(e) {
    const idx = e.target.dataset['idx'];
    if (idx) {
        myLibrary[idx].toggleRead();
    }
}

function displayBooks() {
    const unread = myLibrary.filter((el) => !el.read).length;

    let h2 = document.querySelector('.dashboard h2');
    h2.textContent = `You have ${myLibrary.length} books (${unread} unread)`;

    let books = document.querySelector('.books');

    
    // remove all books from the page
    while (books.firstChild) {
        books.removeChild(books.firstChild);
    }

    myLibrary.sort((a, b) => (a.title.toUpperCase() < b.title.toUpperCase()) ? -1 : 1);

    // display all books
    myLibrary.forEach((book, idx) => {
        let divBook = document.createElement('div');
        divBook.classList.add('book');
        if (book.read) divBook.classList.add('book--read');

        let info = document.createElement('span');
        info.classList.add('book__title');
        info.textContent = book.title;
        divBook.appendChild(info);

        info = document.createElement('span');
        info.textContent = 'by ' + book.author;
        divBook.appendChild(info);

        if (book.pages) {
            info = document.createElement('span');
            info.textContent = book.pages + ' pages';
            divBook.appendChild(info);
        }

        let inputContainer = document.createElement('div');
        inputContainer.classList.add('book__input-container');
        
        let imgTrash = document.createElement('img');
        imgTrash.setAttribute('src', 'trash.svg');
        imgTrash.classList.add('book__img-remove');
        imgTrash.addEventListener('click', libraryRemoveBook);
        imgTrash.setAttribute('data-idx', idx);
        inputContainer.appendChild(imgTrash);

        let divChk = document.createElement('div');
        divChk.classList.add('book__chk-container');
        if (book.read) divChk.classList.add('book--read');
        
        let chk = document.createElement('input');
        chk.setAttribute('type', 'checkbox');
        let id = 'read' + idx;
        chk.setAttribute('id', id);
        chk.setAttribute('name', 'read');
        chk.setAttribute('data-idx', idx);
        if (book.read) chk.setAttribute('checked', 'true');
        chk.addEventListener('click', libraryToggleBookRead);
        divChk.appendChild(chk);

        let lbl = document.createElement('label');
        lbl.setAttribute('for', id);
        lbl.textContent = 'read';
        divChk.appendChild(lbl);

        inputContainer.appendChild(divChk);

        divBook.appendChild(inputContainer);

        books.appendChild(divBook);
    });
}

function addNewBook() {
    // pop up a form to allow the user to enter a new book

    // clear previous values
    document.querySelector('.frm-add-book').querySelectorAll('input').forEach((el) => (el.type == 'text') ? el.value = '' : el.checked = false);

    // show the form
    document.querySelector('.modal-container').style.display = 'block';
}

function newBookFrmCancel(e) {
    // hide the form
    document.querySelector('.modal-container').style.display = 'none';
}

function newBookFrmSubmit(e) {
    const title = e.srcElement['title'].value;
    if (!title) return;

    const author = e.srcElement['author'].value;
    if (!author) return;

    const pages = parseInt(e.srcElement['pages'].value);
    const read = e.srcElement['read'].checked;

    let book = new Book(title, author, pages, read);

    myLibrary.push(book);    

    document.querySelector('.modal-container').style.display = 'none';

    displayBooks();
}

function libraryLoadBookData() {
    libraryAddBook('The Stand', 'Stephen King', 823, true);
    libraryAddBook('Soldier Son', 'Robin Hobb', 624, false);
    libraryAddBook("Pride and Prejudice", "Jane Austen", 279, true);
    libraryAddBook("The Great Gatsby", "F. Scott Fitzgerald", 200, false);
    libraryAddBook("To Kill a Mockingbird", "Harper Lee", 336, true);
    libraryAddBook("Jane Eyre", "Charlotte Brontë", 100, false);
    libraryAddBook("1984", "George Orwell", 100, true);
    libraryAddBook("Wuthering Heights", "Emily Brontë", 100, true);
    libraryAddBook("Animal Farm", "George Orwell", 100, false);
    libraryAddBook("The Catcher in the Rye", "J.D. Salinger", 100, true);
    libraryAddBook("Little Women", "Louisa May Alcott", 100, false);
    libraryAddBook("The Picture of Dorian Gray", "Oscar Wilde", 100, false);
    libraryAddBook("Frankenstein: The 1818 Text", "Mary Wollstonecraft Shelley", 100, false);
    libraryAddBook("Lord of the Flies", "William Golding", 100, true);
    libraryAddBook("Romeo and Juliet", "William Shakespeare", 100, false);
    libraryAddBook("Of Mice and Men", "John Steinbeck", 100, true);
    libraryAddBook("Sense and Sensibility", "Jane Austen", 100, false);
    libraryAddBook("Emma", "Jane Austen", 100, false);
    libraryAddBook("Fahrenheit 451", "Ray Bradbury", 100, false);
    libraryAddBook("Dracula", "Bram Stoker", 100, false);
    libraryAddBook("A Tale of Two Cities", "Charles Dickens", 100, false);
    libraryAddBook("The Adventures of Huckleberry Finn", "Mark Twain", 100, false);
    libraryAddBook("Great Expectations", "Charles Dickens", 100, false);
    libraryAddBook("The Scarlet Letter", "Nathaniel Hawthorne", 100, false);
    libraryAddBook("Persuasion", "Jane Austen", 100, false);
    libraryAddBook("Anna Karenina", "Leo Tolstoy", 100, false);
    libraryAddBook("The Count of Monte Cristo", "Alexandre Dumas", 100, true);
    libraryAddBook("The Odyssey", "Homer", 100, false);
    libraryAddBook("Brave New World", "Aldous Huxley", 100, true);
    libraryAddBook("Hamlet", "William Shakespeare", 100, false);
    libraryAddBook("Crime and Punishment", "Fyodor Dostoevsky", 100, false);
    libraryAddBook("A Christmas Carol", "Charles Dickens", 100, false);
    libraryAddBook("The Hobbit, or There and Back Again", "J.R.R. Tolkien", 100, true);
    libraryAddBook("The Secret Garden", "Frances Hodgson Burnett", 100, false);
    libraryAddBook("Macbeth", "William Shakespeare", 100, false);
    libraryAddBook("Les Misérables", "Victor Hugo", 100, false);
    libraryAddBook("The Old Man and the Sea", "Ernest Hemingway", 100, false);
    libraryAddBook("The Little Prince", "Antoine de Saint-Exupéry", 100, false);
    libraryAddBook("Northanger Abbey", "Jane Austen", 100, false);
    libraryAddBook("The Adventures of Tom Sawyer", "Mark Twain", 100, false);
    libraryAddBook("The Diary of a Young Girl", "Anne Frank", 100, false);
    libraryAddBook("The Grapes of Wrath", "John Steinbeck", 100, false);
    libraryAddBook("Anne of Green Gables", "L.M. Montgomery", 100, false);
    libraryAddBook("Dr. Jekyll and Mr. Hyde", "Robert Louis Stevenson", 100, false);
    libraryAddBook("Mansfield Park", "Jane Austen", 100, false);
    libraryAddBook("Gone with the Wind", "Margaret Mitchell", 100, false);
    libraryAddBook("Slaughterhouse-Five", "Kurt Vonnegut Jr.", 100, false);
    libraryAddBook("Lolita", "Vladimir Nabokov", 100, false);
    libraryAddBook("Moby-Dick or, the Whale", "Herman Melville", 100, false);
    libraryAddBook("The Iliad", "Homer", 100, false);
    libraryAddBook("A Midsummer Night's Dream", "William Shakespeare", 100, false);
    libraryAddBook("The Metamorphosis", "Franz Kafka", 100, false);
}
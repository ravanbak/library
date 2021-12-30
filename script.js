let myLibrary = [];

myLibrary.push(new Book('The Stand', 'Stephen King', 823, true));
// myLibrary.push(new Book('Soldier Son', 'Robin Hobb', 624, false));
// myLibrary.push(new Book("Pride and Prejudice", "Jane Austen", 279, true));
// myLibrary.push(new Book("The Great Gatsby", "F. Scott Fitzgerald", 200, false));
// myLibrary.push(new Book("To Kill a Mockingbird", "Harper Lee", 336, true));
// myLibrary.push(new Book("Jane Eyre", "Charlotte Brontë", 100, false));
// myLibrary.push(new Book("1984", "George Orwell", 100, true));
// myLibrary.push(new Book("Wuthering Heights", "Emily Brontë", 100, true));
// myLibrary.push(new Book("Animal Farm", "George Orwell", 100, false));
// myLibrary.push(new Book("The Catcher in the Rye", "J.D. Salinger", 100, true));
// myLibrary.push(new Book("Little Women", "Louisa May Alcott", 100, false));
// myLibrary.push(new Book("The Picture of Dorian Gray", "Oscar Wilde", 100, false));
// myLibrary.push(new Book("Frankenstein: The 1818 Text", "Mary Wollstonecraft Shelley", 100, false));
// myLibrary.push(new Book("Lord of the Flies", "William Golding", 100, true));
// myLibrary.push(new Book("Romeo and Juliet", "William Shakespeare", 100, false));
// myLibrary.push(new Book("Of Mice and Men", "John Steinbeck", 100, true));
// myLibrary.push(new Book("Sense and Sensibility", "Jane Austen", 100, false));
// myLibrary.push(new Book("Emma", "Jane Austen", 100, false));
// myLibrary.push(new Book("Fahrenheit 451", "Ray Bradbury", 100, false));
// myLibrary.push(new Book("Dracula", "Bram Stoker", 100, false));
// myLibrary.push(new Book("A Tale of Two Cities", "Charles Dickens", 100, false));
// myLibrary.push(new Book("The Adventures of Huckleberry Finn", "Mark Twain", 100, false));
// myLibrary.push(new Book("Great Expectations", "Charles Dickens", 100, false));
// myLibrary.push(new Book("The Scarlet Letter", "Nathaniel Hawthorne", 100, false));
// myLibrary.push(new Book("Persuasion", "Jane Austen", 100, false));
// myLibrary.push(new Book("Anna Karenina", "Leo Tolstoy", 100, false));
// myLibrary.push(new Book("The Count of Monte Cristo", "Alexandre Dumas", 100, true));
// myLibrary.push(new Book("The Odyssey", "Homer", 100, false));
// myLibrary.push(new Book("Brave New World", "Aldous Huxley", 100, true));
// myLibrary.push(new Book("Hamlet", "William Shakespeare", 100, false));
// myLibrary.push(new Book("Crime and Punishment", "Fyodor Dostoevsky", 100, false));
// myLibrary.push(new Book("A Christmas Carol", "Charles Dickens", 100, false));
// myLibrary.push(new Book("The Hobbit, or There and Back Again", "J.R.R. Tolkien", 100, true));
// myLibrary.push(new Book("The Secret Garden", "Frances Hodgson Burnett", 100, false));
// myLibrary.push(new Book("Macbeth", "William Shakespeare", 100, false));
// myLibrary.push(new Book("Les Misérables", "Victor Hugo", 100, false));
// myLibrary.push(new Book("The Old Man and the Sea", "Ernest Hemingway", 100, false));
// myLibrary.push(new Book("The Little Prince", "Antoine de Saint-Exupéry", 100, false));
// myLibrary.push(new Book("Northanger Abbey", "Jane Austen", 100, false));
// myLibrary.push(new Book("The Adventures of Tom Sawyer", "Mark Twain", 100, false));
// myLibrary.push(new Book("The Diary of a Young Girl", "Anne Frank", 100, false));
// myLibrary.push(new Book("The Grapes of Wrath", "John Steinbeck", 100, false));
// myLibrary.push(new Book("Anne of Green Gables", "L.M. Montgomery", 100, false));
// myLibrary.push(new Book("Dr. Jekyll and Mr. Hyde", "Robert Louis Stevenson", 100, false));
// myLibrary.push(new Book("Mansfield Park", "Jane Austen", 100, false));
// myLibrary.push(new Book("Gone with the Wind", "Margaret Mitchell", 100, false));
// myLibrary.push(new Book("Slaughterhouse-Five", "Kurt Vonnegut Jr.", 100, false));
// myLibrary.push(new Book("Lolita", "Vladimir Nabokov", 100, false));
// myLibrary.push(new Book("Moby-Dick or, the Whale", "Herman Melville", 100, false));
// myLibrary.push(new Book("The Iliad", "Homer", 100, false));
// myLibrary.push(new Book("A Midsummer Night's Dream", "William Shakespeare", 100, false));
// myLibrary.push(new Book("The Metamorphosis", "Franz Kafka", 100, false));

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

function addBookToLibrary() {
    const title = prompt("Title?:");
    const author = prompt("Author?:");
    const pages = parseInt(prompt("Number of pages?:"));
    const read = (prompt("Have you read this book [Y/N]?:", 'N') == 'N') ? false : true;

    let book = new Book(title, author, pages, read);

    myLibrary.push(book);
}

function displayBooks() {
    let books = document.querySelector('.books');
    
    // remove all books from the page
    while (books.firstChild) {
        books.removeChild(books.firstChild);
    }

    // display all books
    myLibrary.forEach((book) => {
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

        info = document.createElement('span');
        info.textContent = book.pages + ' pages';
        divBook.appendChild(info);

        info = document.createElement('span');
        info.textContent = book.getReadString();
        divBook.appendChild(info);

        books.appendChild(divBook);
    });
}

displayBooks();

// buttons on main page
document.querySelector('.btn-add-book').addEventListener('click', addBook);

// buttons on form
document.querySelector('.frm-add-book__btn-cancel').addEventListener('click', cancelForm);
document.querySelector('.frm-add-book').addEventListener('submit', submitBook);


function cancelForm(e) {
    // hide the form
    document.querySelector('.modal-container').style.display = 'none';
}

function addBook() {
    // clear previous values
    document.querySelector('.frm-add-book').querySelectorAll('input').forEach((el) => el.value = '');

    // show the form
    document.querySelector('.modal-container').style.display = 'block';
}

function submitBook(e) {
    const title = e.srcElement['title'].value;
    if (!title) return;

    const author = e.srcElement['author'].value;
    if (!author) return;

    const pages = parseInt(e.srcElement['pages'].value);
    const read = false; // e.srcElement['read'].value;

    let book = new Book(title, author, pages, read);

    myLibrary.push(book);    

    document.querySelector('.modal-container').style.display = 'none';

    displayBooks();
}
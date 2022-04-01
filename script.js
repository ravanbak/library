"use strict";

class Book {

    // public fields
    title = '';
    author = '';
    pages = 0;
    read = false;

    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    getReadString() {
        return this.read ? 'Read' : 'Not read yet';    
    }

    info() {
        return `${this.title}, ${this.pages} pages, ` + this.getReadString();
    }

    toggleRead() {
        this.read = !this.read;
    }

}

class Library {

    books = [];

    constructor() {
        // add default books:
        this.addBook('The Stand', 'Stephen King', 823, true);
        this.addBook('Soldier Son', 'Robin Hobb', 624, false);
        this.addBook("Pride and Prejudice", "Jane Austen", 279, true);
        this.addBook("The Great Gatsby", "F. Scott Fitzgerald", 200, false);
        this.addBook("To Kill a Mockingbird", "Harper Lee", 336, true);
        this.addBook("Jane Eyre", "Charlotte Brontë", 100, false);
        this.addBook("1984", "George Orwell", 100, true);
        this.addBook("Wuthering Heights", "Emily Brontë", 100, true);
        this.addBook("Animal Farm", "George Orwell", 100, false);
        this.addBook("The Catcher in the Rye", "J.D. Salinger", 100, true);
        this.addBook("Little Women", "Louisa May Alcott", 100, false);
        this.addBook("The Picture of Dorian Gray", "Oscar Wilde", 100, false);
        this.addBook("Frankenstein: The 1818 Text", "Mary Wollstonecraft Shelley", 100, false);
        this.addBook("Lord of the Flies", "William Golding", 100, true);
        this.addBook("Romeo and Juliet", "William Shakespeare", 100, false);
        this.addBook("Of Mice and Men", "John Steinbeck", 100, true);
        this.addBook("Sense and Sensibility", "Jane Austen", 100, false);
        this.addBook("Emma", "Jane Austen", 100, false);
        this.addBook("Fahrenheit 451", "Ray Bradbury", 100, false);
        this.addBook("Dracula", "Bram Stoker", 100, false);
        this.addBook("A Tale of Two Cities", "Charles Dickens", 100, false);
        this.addBook("The Adventures of Huckleberry Finn", "Mark Twain", 100, false);
        this.addBook("Great Expectations", "Charles Dickens", 100, false);
        this.addBook("The Scarlet Letter", "Nathaniel Hawthorne", 100, false);
        this.addBook("Persuasion", "Jane Austen", 100, false);
        this.addBook("Anna Karenina", "Leo Tolstoy", 100, false);
        this.addBook("The Count of Monte Cristo", "Alexandre Dumas", 100, true);
        this.addBook("The Odyssey", "Homer", 100, false);
        this.addBook("Brave New World", "Aldous Huxley", 100, true);
        this.addBook("Hamlet", "William Shakespeare", 100, false);
        this.addBook("Crime and Punishment", "Fyodor Dostoevsky", 100, false);
        this.addBook("A Christmas Carol", "Charles Dickens", 100, false);
        this.addBook("The Hobbit, or There and Back Again", "J.R.R. Tolkien", 100, true);
        this.addBook("The Secret Garden", "Frances Hodgson Burnett", 100, false);
        this.addBook("Macbeth", "William Shakespeare", 100, false);
        this.addBook("Les Misérables", "Victor Hugo", 100, false);
        this.addBook("The Old Man and the Sea", "Ernest Hemingway", 100, false);
        this.addBook("The Little Prince", "Antoine de Saint-Exupéry", 100, false);
        this.addBook("Northanger Abbey", "Jane Austen", 100, false);
        this.addBook("The Adventures of Tom Sawyer", "Mark Twain", 100, false);
        this.addBook("The Diary of a Young Girl", "Anne Frank", 100, false);
        this.addBook("The Grapes of Wrath", "John Steinbeck", 100, false);
        this.addBook("Anne of Green Gables", "L.M. Montgomery", 100, false);
        this.addBook("Dr. Jekyll and Mr. Hyde", "Robert Louis Stevenson", 100, false);
        this.addBook("Mansfield Park", "Jane Austen", 100, false);
        this.addBook("Gone with the Wind", "Margaret Mitchell", 100, false);
        this.addBook("Slaughterhouse-Five", "Kurt Vonnegut Jr.", 100, false);
        this.addBook("Lolita", "Vladimir Nabokov", 100, false);
        this.addBook("Moby-Dick or, the Whale", "Herman Melville", 100, false);
        this.addBook("The Iliad", "Homer", 100, false);
        this.addBook("A Midsummer Night's Dream", "William Shakespeare", 100, false);
        this.addBook("The Metamorphosis", "Franz Kafka", 100, false);
    }

    addBook(title, author, pages, read) {
        this.books.push(new Book(title, author, pages, read));
    }

    removeBook(idx) {
        if (idx) {
            this.books.splice(parseInt(idx), 1);
        }
    }

    toggleBookRead(idx) {
        if (idx) {
            this.books[parseInt(idx)].toggleRead();
        }
    }

    sortBooks(sortField) {
        switch (sortField) {
            case 'title':
            case 'author':
                this.books.sort((a, b) => (a[sortField].toUpperCase() > b[sortField].toUpperCase()) ? 1 : -1);
                break;

            case 'pages':
                this.books.sort((a, b) => (+a.pages > +b.pages) ? 1 : -1);
                break;

            case 'read':
                this.books.sort((a, b) => (!a.read) ? 1 : -1);
                break;
        }        
    }

}

class DisplayController {

    library;
    #sortField = 'title';

    constructor(library) {
        this.library = library;
        this.#initPage();
    }

    #initPage() {
        // buttons on main page
        document.querySelector('.btn-add-book').addEventListener('click', () => this.#addNewBook());

        // buttons on form
        document.querySelector('.frm-add-book__btn-cancel').addEventListener('click', this.#newBookFrmCancel);
        document.querySelector('.frm-add-book').addEventListener('submit', (e) => this.#newBookFrmSubmit(e));

        document.querySelector('.dashboard__sort-container select').addEventListener('change', (e) => {
            this.#sortField = e.target.value;
            //this.library.sortBooks(e.target.value);
            this.displayBooks();
        });
        
        this.library.sortBooks(this.#sortField); // default sort

        this.displayBooks();        
    }
    
    #addNewBook() {
        // pop up a form to allow the user to enter a new book
    
        // clear previous values
        document.querySelector('.frm-add-book').querySelectorAll('input').forEach((el) => (el.type == 'text') ? el.value = '' : el.checked = false);
    
        // show the form
        document.querySelector('.modal-container').style.display = 'block';

        this.displayBooks();
    }
    
    #newBookFrmCancel() {
        // hide the form
        document.querySelector('.modal-container').style.display = 'none';
    }
    
    #newBookFrmSubmit(e) {
        const title = e.srcElement['title'].value;
        if (!title) return;
    
        const author = e.srcElement['author'].value;
        if (!author) return;
    
        const pages = parseInt(e.srcElement['pages'].value);
        const read = e.srcElement['read'].checked;
    
        this.library.addBook(title, author, pages, read);
    
        document.querySelector('.modal-container').style.display = 'none';
    
        this.displayBooks();
    }    

    displayBooks() {
        const unread = this.library.books.filter((el) => !el.read).length;
    
        let h2 = document.querySelector('.dashboard h2');
        h2.textContent = `You have ${this.library.books.length} books (${unread} unread)`;
    
        let books = document.querySelector('.books');
        
        // remove all books from the page
        while (books.firstChild) {
            books.removeChild(books.firstChild);
        }
    
        this.library.sortBooks(this.#sortField);
        
        // display all books
        this.library.books.forEach((book, idx) => {
    
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
            imgTrash.addEventListener('click', (e) => {
                this.library.removeBook(e.target.dataset['idx']);
                this.displayBooks();
            });
            
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
            chk.addEventListener('click', (e) => { 
                this.library.toggleBookRead(e.target.dataset['idx']);
                this.displayBooks();
            });
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

}

let displayController = new DisplayController(new Library());
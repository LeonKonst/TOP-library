const bookcardContainer = document.querySelector(".bookcard-container");

const myLibrary = [];

function Book(bookTitle, authorName, releaseYear, pages, genre, id) {
    this.bookTitle = bookTitle;
    this.authorName = authorName;
    this.releaseYear = releaseYear;
    this.pages = pages;
    this.genre = genre;
    this.id = id;
}

function addBookToLibrary(bookTitle, authorName, releaseYear, pages, genre) {
    const id = crypto.randomUUID();
    const book = new Book (bookTitle, authorName, releaseYear, pages, genre, id);
    myLibrary.push(book)
}

function refreshBookshelf (){
    bookcardContainer.innerHTML="";
    myLibrary.map((element)=>{
    bookcardContainer.innerHTML += `
        <div class="bookcard">
            <button class="delete-book-btn">x</button>
            <h1>${element.bookTitle}</h1>
            <h2>by ${element.authorName}</h2>
            <h3>Year: ${element.releaseYear}</h3>
            <p>Pages: ${element.pages}</p>
        </div>
    `
    })
}

addBookToLibrary("The Great Gatsby","F. Scott Fitzgerald",1925,218,"Fiction");
addBookToLibrary("1984","George Orwell",1949,328,"Fiction");
addBookToLibrary("To Kill a Mockingbird","Harper Lee",1960,281,"Fiction");
addBookToLibrary("The Diary of a Young Girl","Anne Frank",1947,283,"Nonfiction");
addBookToLibrary("Hamlet","William Shakespeare",1603,342,"Drama");

refreshBookshelf();

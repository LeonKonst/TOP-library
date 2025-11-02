const bookcardContainer = document.querySelector(".bookcard-container");
const addBookBtn = document.querySelector(".add-book-btn");



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
    refreshBookshelf();
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
            <p>${element.genre}</p>
        </div>
    `
    })
}

addBookToLibrary("The Great Gatsby","F. Scott Fitzgerald",1925,218,"Fiction");
addBookToLibrary("1984","George Orwell",1949,328,"Fiction");
addBookToLibrary("To Kill a Mockingbird","Harper Lee",1960,281,"Fiction");
addBookToLibrary("The Diary of a Young Girl","Anne Frank",1947,283,"Nonfiction");
addBookToLibrary("Hamlet","William Shakespeare",1603,342,"Drama");



function addNewBookcard(){
    bookcardContainer.innerHTML += `
        <div class="new-bookcard">
            <button class="delete-book-btn">x</button>
            <button class="accept-new-book-btn">✓</button>
            <div>
                <label for="new-book-title">Book Title</label>
                <input class="new-book-title" type="text" id="new-book-title">
            </div>

                <div>
                <label for="new-book-author">Author</label>
                <input class="new-book-author" type="text" id="new-book-author">
            </div>

            <div>
                <label for="new-book-year">Release Year</label>
                <input class="new-book-year" type="number" id="new-book-year">
            </div>

            <div>
                <label for="new-book-pages">Pages</label>
                <input class="new-book-pages" type="number" id="new-book-pages">
            </div>

            <div>
                <label for="genre">Genre</label>
                <select class="new-book-genre" name="genre" id="genre">
                    <option value="fiction">Fiction</option>
                    <option value="nonfiction">Nonfiction</option>
                    <option value="poetry">Poetry</option>
                    <option value="drama">Drama</option>
                </select>
            </div>
            
        </div>
    `;
}

function acceptNewbookData(){
    const bookTitleInput = document.querySelector(".new-book-title").value;
    const authorNameInput = document.querySelector(".new-book-author").value;
    const releaseYearInput = document.querySelector(".new-book-year").value;
    const pagesInput = document.querySelector(".new-book-pages").value;
    const genreInput = document.querySelector(".new-book-genre").value;
    addBookToLibrary(bookTitleInput, authorNameInput, releaseYearInput, pagesInput, genreInput);
    addBookBtn.disabled = false;
}

addBookBtn.addEventListener("click", ()  =>
    {
        addNewBookcard();
        addBookBtn.disabled = true;
        const acceptNewBookBtn = document.querySelector(".accept-new-book-btn");
        acceptNewBookBtn.addEventListener("click", () => {
            acceptNewbookData();
        })
    }

)
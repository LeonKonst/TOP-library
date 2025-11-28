class Library {

    constructor(){
        this.myLibrary = []
    }

    addBookToLibrary(bookTitle, authorName, releaseYear, pages, genre, hasBeenRead) {
        const id = crypto.randomUUID();
        const book = new Book (bookTitle, authorName, releaseYear, pages, genre, hasBeenRead, id);
        this.myLibrary.push(book);
        UIhandler.refreshBookshelf ()
    }

    removeBook(card){
        const idToRemove = card.dataset.attribute;
        this.myLibrary = this.myLibrary.filter((el) => el.id !== idToRemove);
        UIhandler.refreshBookshelf();
    }
}

class Book {

    constructor(bookTitle, authorName, releaseYear, pages, genre, hasBeenRead, id){
        this.bookTitle = bookTitle;
        this.authorName = authorName;
        this.releaseYear = releaseYear;
        this.pages = pages;
        this.genre = genre;
        this.hasBeenRead = hasBeenRead;
        this.id = id;
    }

    toggleRead() {
        this.hasBeenRead = !this.hasBeenRead;
    }

}

class UIhandler {

    static refreshBookshelf(){
        bookcardContainer.innerHTML="";
        library.myLibrary.map((element)=>{
        bookcardContainer.innerHTML += `
            <div class="bookcard" data-attribute="${element.id}">
                <button class="delete-book-btn">x</button>
                <h1>${element.bookTitle}</h1>
                <h2>by ${element.authorName}</h2>
                <h3>Year: ${element.releaseYear}</h3>
                <p>Pages: ${element.pages}</p>
                <p>${element.genre}</p>
                <button class="${element.hasBeenRead} has-been-read"></button>
            </div>
        `
        })

        const deleteBtns = document.querySelectorAll(".delete-book-btn");
        deleteBtns.forEach(el => {
            el.addEventListener("click", () => {
                library.removeBook(el.closest(".bookcard"));
            })
        })

        const hasBeenReadBtns = document.querySelectorAll(".has-been-read");
            hasBeenReadBtns.forEach(el => {
            el.addEventListener("click", () => {
                el.classList.toggle("true");
                const idToToggle = el.parentElement.dataset.attribute;
                library.myLibrary.find((el) => el.id === idToToggle).toggleRead();
            })
        })
    }

}

class UIBookCards{
    static addNewBookcard(){

        const cardContainer = document.createElement("div");
        cardContainer.classList.add("new-bookcard");
        cardContainer.innerHTML += `
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
            <div>
                <label for="new-has-been-read">Have you read it?</label>
                <select class="new-has-been-read" name="new-has-been-read" id="new-has-been-read">
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
            </div>
        `;

        bookcardContainer.appendChild(cardContainer);
        
        addBookBtn.disabled = true;
        
        const acceptNewBookBtn = cardContainer.querySelector(".accept-new-book-btn");
        
        acceptNewBookBtn.addEventListener("click", () => {
            UIBookCards.acceptNewbookData(cardContainer);

        })

        const deleteBtn = cardContainer.querySelector(".delete-book-btn");
        deleteBtn.addEventListener("click", () => {
            cardContainer.remove();
            addBookBtn.disabled = false;
        })
    }    

    static capitalizeFirstLetter(val) {
        return String(val).charAt(0).toUpperCase() + String(val).slice(1);
    }

    static acceptNewbookData(cardContainer){
        const bookTitleInput = cardContainer.querySelector(".new-book-title").value;
        const authorNameInput = cardContainer.querySelector(".new-book-author").value;
        const releaseYearInput = cardContainer.querySelector(".new-book-year").value;
        const pagesInput = cardContainer.querySelector(".new-book-pages").value;
        const genreInput = UIBookCards.capitalizeFirstLetter(cardContainer.querySelector(".new-book-genre").value);
        const hasBeenReadInput = cardContainer.querySelector(".new-has-been-read").value==="true";
        cardContainer.remove();
        library.addBookToLibrary(bookTitleInput, authorNameInput, releaseYearInput, pagesInput, genreInput, hasBeenReadInput);
        addBookBtn.disabled = false;
    }
}

const bookcardContainer = document.querySelector(".bookcard-container");
const addBookBtn = document.querySelector(".add-book-btn");

const library = new Library();

library.addBookToLibrary("The Great Gatsby","F. Scott Fitzgerald",1925,218,"Fiction", true);
library.addBookToLibrary("1984","George Orwell",1949,328, "Fiction", false);
library.addBookToLibrary("To Kill a Mockingbird","Harper Lee",1960,281, "Fiction", true);
library.addBookToLibrary("The Diary of a Young Girl","Anne Frank",1947,283, "Nonfiction", false);
library.addBookToLibrary("Hamlet","William Shakespeare",1603,342, "Drama", true);


addBookBtn.addEventListener("click", () =>
    UIBookCards.addNewBookcard()
)
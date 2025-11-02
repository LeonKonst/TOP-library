const myLibrary = [];

function Book(authorName, releaseYear, pages, id) {
  this.authorName = authorName;
  this.releaseYear = releaseYear;
  this.pages = pages;
  this.id = id;
}

function addBookToLibrary(authorName, releaseYear, pages) {
    const id = crypto.randomUUID();
    const book = new Book (authorName,releaseYear,pages,id);
    myLibrary.push(book)
}
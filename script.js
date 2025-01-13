const myLibrary = [];

// Buch-Klasse
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

// Buch zur Bibliothek hinzufügen
function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  displayBooks();
}

// Bücher im DOM anzeigen
function displayBooks() {
  const libraryDisplay = document.getElementById("library-display");
  libraryDisplay.innerHTML = ""; // Bestehende Anzeige löschen
  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    bookCard.innerHTML = `
        <h3>${book.title}</h3>
        <p>Author: ${book.author}</p>
        <p>Pages: ${book.pages}</p>
        <p>Status: ${book.read ? "Read" : "Not read yet"}</p>
        <button class="remove-btn" data-index="${index}">Delete</button>
        <button class="toggle-read-btn" data-index="${index}">${
      book.read ? "Mark as unread" : "Mark as read"
    }</button>
        `;
    libraryDisplay.appendChild(bookCard);
  });
}

// Eventlistener für das Formular
const form = document.getElementById("new-book-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").checked;

  addBookToLibrary(title, author, pages, read);
  form.reset();
  form.style.display = "none";
});

// Eventlistener für "Neues Buch"-Button
document.getElementById("new-book-btn").addEventListener("click", () => {
  form.style.display = form.style.display === "none" ? "block" : "none";
});

// Event-Delegation für Buchaktionen
document.getElementById("library-display").addEventListener("click", (e) => {
  const index = e.target.dataset.index;
  if (e.target.classList.contains("remove-btn")) {
    myLibrary.splice(index, 1); // Buch löschen
    displayBooks();
  } else if (e.target.classList.contains("toggle-read-btn")) {
    myLibrary[index].read = !myLibrary[index].read; // Lesestatus umschalten
    displayBooks();
  }
});

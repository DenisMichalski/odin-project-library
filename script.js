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
 // libraryDisplay.innerHTML = ""; // Bestehende Anzeige löschen
  
  while (libraryDisplay.firstChild) {
    libraryDisplay.removeChild(libraryDisplay.firstChild);
  }


  myLibrary.forEach((book, index) => {
    // Buch-Karte erstellen
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    // Titel
    const title = document.createElement("h3");
    title.textContent = book.title;
    bookCard.appendChild(title);

    // Autor
    const author = document.createElement("p");
    author.textContent = `Author: ${book.author}`;
    bookCard.appendChild(author);

    // Seiten
    const pages = document.createElement("p");
    pages.textContent = `Pages: ${book.pages}`;
    bookCard.appendChild(pages);

    // Status
    const status = document.createElement("p");
    status.textContent = `Status: ${book.read ? "Read" : "Not read yet"}`;
    bookCard.appendChild(status);

    // Löschen-Button
    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-btn");
    removeBtn.textContent = "Delete";
    removeBtn.dataset.index = index; // Index als Datenattribut
    bookCard.appendChild(removeBtn);

    // Lesestatus-Button
    const toggleReadBtn = document.createElement("button");
    toggleReadBtn.classList.add("toggle-read-btn");
    toggleReadBtn.textContent = book.read ? "Mark as unread" : "Mark as read";
    toggleReadBtn.dataset.index = index; // Index als Datenattribut
    bookCard.appendChild(toggleReadBtn);

    // Karte zur Anzeige hinzufügen
    libraryDisplay.appendChild(bookCard);
  });
}

// Eventlistener für das Formular
const form = document.getElementById("new-book-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Eingabewerte abrufen
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").checked;

  // Buch hinzufügen
  addBookToLibrary(title, author, pages, read);

  // Formular zurücksetzen und ausblenden
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
    // Buch löschen
    myLibrary.splice(index, 1);
    displayBooks();
  } else if (e.target.classList.contains("toggle-read-btn")) {
    // Lesestatus umschalten
    myLibrary[index].read = !myLibrary[index].read;
    displayBooks();
  }
});

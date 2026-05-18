const books = [];
const STORAGE_KEY = "BOOK-SHELF";
const RENDER_EVENT = "render-book";
let searchQuery = "";
let editingBookId = null;

function isStorageExist() {
    if (typeof Storage === undefined) {
        alert("Browser kamu tidak mendukung local storage");
        return false;
    }
    return true;
}

function loadData() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData);

    if (data !== null) {
        for (const book of data) {
            books.push(book);
        }
    }

    document.dispatchEvent(new Event(RENDER_EVENT));
}

function saveData() {
    if (isStorageExist()) {
        const parsed = JSON.stringify(books);
        localStorage.setItem(STORAGE_KEY, parsed);
    }
}

function createBookElement(bookObject) {
    const { id, title, author, year, isComplete } = bookObject;

    const container = document.createElement("div");
    container.classList.add("bookItem");
    container.setAttribute("data-bookid", id);
    container.setAttribute("data-testid", "bookItem");

    container.innerHTML = `
            <h3 data-testid="bookItemTitle">Judul: ${title}</h3>
            <p data-testid="bookItemAuthor">Penulis: ${author}</p>
            <p data-testid="bookItemYear">Tahun: ${year}</p>
            <div class="listButton">
                <button data-testid="bookItemIsCompleteButton" class="completeButton" onclick="changeStatus(${id})">
                    ${isComplete ? "Belum selesai dibaca" : "Selesai dibaca"}
                </button>
                <button data-testid="bookItemDeleteButton" class="deleteButton" onclick="deleteBook(${id})">Hapus Buku</button>
                <button data-testid="bookItemEditButton" class="editButton" onclick="editBook(${id})">Edit Buku</button>
            </div>
        `;

    return container;
}

function changeStatus(id) {
    const bookTarget = books.find((book) => book.id === id);

    bookTarget.isComplete = !bookTarget.isComplete;
    saveData();
    document.dispatchEvent(new Event(RENDER_EVENT));
}

function deleteBook(id) {
    const bookIndex = books.findIndex((book) => book.id === id);

    books.splice(bookIndex, 1);
    saveData();
    document.dispatchEvent(new Event(RENDER_EVENT));
}

function editBook(id) {
    const bookTarget = books.find((book) => book.id === id);
    editingBookId = id;

    document.querySelector("#bookFormTitle").value = bookTarget.title;
    document.querySelector("#bookFormAuthor").value = bookTarget.author;
    document.querySelector("#bookFormYear").value = bookTarget.year;
    document.querySelector("#bookFormIsComplete").checked = bookTarget.isComplete;

    document.querySelector("#formTitle").innerText = `Edit Buku: ${bookTarget.title}`;
    document.querySelector("#bookFormSubmit").innerText = "Perbarui Buku";

    document.querySelector("#bookFormCancel").style.display = "inline-block";

    window.scrollTo({ top: 0, behavior: "smooth" });
}

function cancelEdit() {
    document.querySelector("#bookFormCancel").style.display = "none";
    document.querySelector("#bookForm").reset();

    document.querySelector("#formTitle").innerText = "Tambah Buku Baru";
    document.querySelector("#bookFormSubmit").innerText = "Masukkan Buku ke rak";
    editingBookId = null;

    document.dispatchEvent(new Event(RENDER_EVENT));
}

document.addEventListener(RENDER_EVENT, function () {
    const incompleteBookList = document.querySelector("#incompleteBookList");
    const completeBookList = document.querySelector("#completeBookList");

    incompleteBookList.innerHTML = "";
    completeBookList.innerHTML = "";

    const filteredBooks = books.filter((book) => book.title.toLowerCase().includes(searchQuery));

    for (const book of filteredBooks) {
        const bookElement = createBookElement(book);

        if (book.isComplete) {
            completeBookList.append(bookElement);
        } else {
            incompleteBookList.append(bookElement);
        }
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const bookForm = document.querySelector("#bookForm");
    bookForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const title = document.querySelector("#bookFormTitle").value;
        const author = document.querySelector("#bookFormAuthor").value;
        const year = document.querySelector("#bookFormYear").value;
        const isComplete = document.querySelector("#bookFormIsComplete").checked;

        if (editingBookId === null) {
            const id = +new Date();

            const book = {
                id,
                title,
                author,
                year: Number(year),
                isComplete,
            };
            books.push(book);
        } else {
            const bookIndex = books.findIndex((book) => book.id === editingBookId);
            if (bookIndex !== -1) {
                books[bookIndex].title = title;
                books[bookIndex].author = author;
                books[bookIndex].year = Number(year);
                books[bookIndex].isComplete = isComplete;
            }
            editingBookId = null;
            document.querySelector("#formTitle").innerText = "Tambah Buku Baru";
            document.querySelector("#bookFormSubmit").innerText = "Masukkan Buku ke rak";
            document.querySelector("#bookFormCancel").style.display = "none";
        }

        bookForm.reset();
        saveData();
        document.dispatchEvent(new Event(RENDER_EVENT));
    });

    const searchBook = document.querySelector("#searchBook");
    searchBook.addEventListener("input", function (e) {
        e.preventDefault();

        const title = document.querySelector("#searchBookTitle").value;
        searchQuery = title.toLowerCase();

        searchBook.addEventListener("submit", function (e) {
            e.preventDefault();
        });

        document.dispatchEvent(new Event(RENDER_EVENT));
    });

    if (isStorageExist()) {
        loadData();
    }
});

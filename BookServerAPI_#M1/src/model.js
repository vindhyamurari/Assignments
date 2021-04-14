"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeBookById = exports.updateBookDetails = exports.createBookEntry = exports.getPostedData = exports.returnBookById = exports.returnBooksInPriceRange = exports.returnBooksOnAuthor = exports.returnBooksOnTextMatch = exports.returnAllBooks = void 0;
//import * as books from './db.json';
var fs = __importStar(require("fs"));
var data = fs.readFileSync('./public/db.json');
var books = JSON.parse(data);
//books.books this will give each book item {} , {} as json file has { books [ {book 1},{ }... }
//Method : GET function to get all the books from the json files
function returnAllBooks() {
    return new Promise(function (resolve) {
        resolve(JSON.stringify(books));
    });
}
exports.returnAllBooks = returnAllBooks;
//Method : GET function to get a particular book by id
function returnBookById(id) {
    return new Promise(function (resolve) {
        var book = books.books.find(function (b) { return b.id === Number(id); });
        resolve(JSON.stringify(book));
    });
}
exports.returnBookById = returnBookById;
// Method : GET  function to return all books matching the given text
function returnBooksOnTextMatch(searchText) {
    return new Promise(function (resolve) {
        var matchedBooks = [];
        searchText = searchText.toLowerCase();
        for (var _i = 0, _a = books.books; _i < _a.length; _i++) {
            var b = _a[_i];
            if (b.title.toLowerCase().indexOf(searchText) != -1) {
                matchedBooks.push(b);
                continue;
            }
            if (b.author.toLowerCase().indexOf(searchText) != -1) {
                matchedBooks.push(b);
                continue;
            }
            if (b.description.toLowerCase().indexOf(searchText) != -1) {
                matchedBooks.push(b);
            }
        }
        resolve(JSON.stringify(matchedBooks));
    });
}
exports.returnBooksOnTextMatch = returnBooksOnTextMatch;
//Method : GET function to return books that match given author name
function returnBooksOnAuthor(author) {
    return new Promise(function (resolve) {
        var matchedBooks = [];
        author = author.toLowerCase();
        for (var _i = 0, _a = books.books; _i < _a.length; _i++) {
            var b = _a[_i];
            if (b.author.toLowerCase().indexOf(author) != -1) {
                matchedBooks.push(b);
            }
        }
        resolve(JSON.stringify(matchedBooks));
    });
}
exports.returnBooksOnAuthor = returnBooksOnAuthor;
//Method : GET function that returns books in the given price range
function returnBooksInPriceRange(price) {
    return new Promise(function (resolve) {
        var matchedBooks = [];
        for (var _i = 0, _a = books.books; _i < _a.length; _i++) {
            var b = _a[_i];
            if (b.price >= price[0] && b.price <= price[1]) {
                matchedBooks.push(b);
            }
        }
        resolve(JSON.stringify(matchedBooks));
    });
}
exports.returnBooksInPriceRange = returnBooksInPriceRange;
//Method : POST function that gets the data from the request body
function getPostedData(request) {
    return new Promise(function (resolve, reject) {
        try {
            console.log('in getPostedData');
            var body_1 = '';
            request.on('data', function (chunk) {
                body_1 += chunk.toString();
            });
            request.on('end', function () { return resolve(body_1); });
        }
        catch (error) {
            reject(error);
        }
    });
}
exports.getPostedData = getPostedData;
// function update the JSON File after post put and delete
function addToJsonFile(books) {
    fs.writeFileSync('./public/db.json', JSON.stringify(books), 'utf8');
}
//Method : POST function to add new book to the JSON file
function createBookEntry(book) {
    return new Promise(function (resolve) {
        //generating the id by getting the last id and incrementing it by one
        var length = books.books.length; //books[lastIndex].id
        var lastBook = books.books[length - 1];
        var id = lastBook.id;
        console.log(id);
        id = id + 1;
        var newBook = __assign({ 'id': id }, book);
        books.books.push(newBook);
        addToJsonFile(books);
        resolve(JSON.stringify(newBook));
    });
}
exports.createBookEntry = createBookEntry;
// Method : PUT function to update book details
function updateBookDetails(id, book) {
    return new Promise(function (resolve) {
        var index = books.books.findIndex(function (b) { return b.id === Number(id); });
        var newid = Number(id);
        books.books[index] = __assign({ id: newid }, book);
        addToJsonFile(books);
        resolve(JSON.stringify(book));
    });
}
exports.updateBookDetails = updateBookDetails;
//Method : DELETE function to remove on book details from the Json file 
function removeBookById(id) {
    return new Promise(function (resolve) {
        var booksAfterDeletion = books.books.filter(function (b) { return b.id !== Number(id); });
        books.books = booksAfterDeletion;
        addToJsonFile(books);
        resolve(1);
    });
}
exports.removeBookById = removeBookById;
//# sourceMappingURL=model.js.map
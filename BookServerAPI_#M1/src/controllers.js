"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.postBook = exports.getBookById = exports.getBooksInPriceRange = exports.getBooksByAuthor = exports.getBooksBySearchOnSimpleText = exports.getAllBooks = void 0;
var model_1 = require("./model");
// Method : GET  function to respond with all books
function getAllBooks(request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var books, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, model_1.returnAllBooks()];
                case 1:
                    books = _a.sent();
                    response.writeHead(200, { 'Content-Type': 'application/json' });
                    response.end(books);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.log(error_1.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getAllBooks = getAllBooks;
// Method : GET  function to respond with book of the given Id
function getBookById(request, response, id) {
    return __awaiter(this, void 0, void 0, function () {
        var book, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, model_1.returnBookById(id)];
                case 1:
                    book = _a.sent();
                    response.writeHead(200, { 'Content-Type': 'application/json' });
                    response.end(book);
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.log(error_2.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getBookById = getBookById;
// Method : GET function to get books by given text
function getBooksBySearchOnSimpleText(request, response, searchText) {
    return __awaiter(this, void 0, void 0, function () {
        var books, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, model_1.returnBooksOnTextMatch(searchText)];
                case 1:
                    books = _a.sent();
                    response.writeHead(200, { 'Content-Type': 'application/json' });
                    response.end(books);
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    console.log(error_3.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getBooksBySearchOnSimpleText = getBooksBySearchOnSimpleText;
// Method : GET function to get books by Author
function getBooksByAuthor(request, response, author) {
    return __awaiter(this, void 0, void 0, function () {
        var books, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, model_1.returnBooksOnAuthor(author)];
                case 1:
                    books = _a.sent();
                    response.writeHead(200, { 'Content-Type': 'application/json' });
                    response.end(books);
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    console.log(error_4.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getBooksByAuthor = getBooksByAuthor;
// Method : GET function to get books In price range
function getBooksInPriceRange(request, response, price) {
    return __awaiter(this, void 0, void 0, function () {
        var books, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, model_1.returnBooksInPriceRange(price)];
                case 1:
                    books = _a.sent();
                    response.writeHead(200, { 'Content-Type': 'application/json' });
                    response.end(books);
                    return [3 /*break*/, 3];
                case 2:
                    error_5 = _a.sent();
                    console.log(error_5.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getBooksInPriceRange = getBooksInPriceRange;
// Method : POST function to get books In price range
function postBook(request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var body, _a, title, author, rating, price, pages, votes, description, book, newBook, error_6;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, model_1.getPostedData(request)];
                case 1:
                    body = _b.sent();
                    _a = JSON.parse(body), title = _a.title, author = _a.author, rating = _a.rating, price = _a.price, pages = _a.pages, votes = _a.votes, description = _a.description;
                    book = { title: title, author: author, rating: rating, price: price, pages: pages, votes: votes, description: description };
                    return [4 /*yield*/, model_1.createBookEntry(book)];
                case 2:
                    newBook = _b.sent();
                    response.writeHead(201, { 'Content-Type': 'application/json' });
                    response.end(newBook);
                    return [3 /*break*/, 4];
                case 3:
                    error_6 = _b.sent();
                    console.log(error_6.message);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.postBook = postBook;
// Method : PUT function to delete book with a particular
function updateBook(request, response, id) {
    return __awaiter(this, void 0, void 0, function () {
        var bookFnd, body, _a, title, author, rating, price, pages, votes, description, bookFound, book, newBook, error_7;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 6, , 7]);
                    return [4 /*yield*/, model_1.returnBookById(id)];
                case 1:
                    bookFnd = _b.sent();
                    if (!!bookFnd) return [3 /*break*/, 2];
                    response.writeHead(404, { 'Content-Type': 'application/json' });
                    response.end(JSON.stringify('Book Not Found'));
                    return [3 /*break*/, 5];
                case 2: return [4 /*yield*/, model_1.getPostedData(request)];
                case 3:
                    body = _b.sent();
                    _a = JSON.parse(body), title = _a.title, author = _a.author, rating = _a.rating, price = _a.price, pages = _a.pages, votes = _a.votes, description = _a.description;
                    bookFound = JSON.parse(bookFnd);
                    book = {
                        title: title || bookFound.title,
                        author: author || bookFound.author,
                        rating: rating || bookFound.rating,
                        price: price || bookFound.price,
                        pages: pages || bookFound.pages,
                        votes: votes || bookFound.votes,
                        description: description || bookFound.description
                    };
                    console.log(book);
                    return [4 /*yield*/, model_1.updateBookDetails(id, book)];
                case 4:
                    newBook = _b.sent();
                    response.writeHead(200, { 'Content-Type': 'application/json' });
                    response.end(newBook);
                    _b.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    error_7 = _b.sent();
                    console.log(error_7.message);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.updateBook = updateBook;
// Method : DELETE function to delete book with a particular
function deleteBook(request, response, id) {
    return __awaiter(this, void 0, void 0, function () {
        var book, error_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, model_1.returnBookById(id)];
                case 1:
                    book = _a.sent();
                    if (!!book) return [3 /*break*/, 2];
                    response.writeHead(404, { 'Content-Type': 'application/json' });
                    response.end(JSON.stringify('Book Not Found'));
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, model_1.removeBookById(id)];
                case 3:
                    _a.sent();
                    response.writeHead(200, { 'Content-Type': 'application/json' });
                    response.end(JSON.stringify({ message: "Book " + id + " removed" }));
                    _a.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_8 = _a.sent();
                    console.log(error_8.message);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.deleteBook = deleteBook;
//# sourceMappingURL=controllers.js.map
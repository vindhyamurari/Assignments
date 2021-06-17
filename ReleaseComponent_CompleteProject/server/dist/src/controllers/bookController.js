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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBookByTags = exports.getBookByPrice = exports.getBookByRating = exports.getBookByTitle = exports.getBooksByText = exports.getBookByAuthor = exports.getBookReviews = exports.createbookReview = exports.updateBook = exports.deleteBook = exports.addNewBook = exports.getBookById = exports.getBooks = void 0;
var bookSchema_1 = __importDefault(require("../models/bookSchema"));
var userSchema_1 = __importDefault(require("../models/userSchema"));
var catchAsyncErrors_1 = __importDefault(require("../middlewares/catchAsyncErrors"));
var getBooks = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Books, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, bookSchema_1.default.find()];
            case 1:
                Books = _a.sent();
                res.status(200).json(Books);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                res.status(404).json({ err: err_1.message, success: false });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getBooks = getBooks;
var getBookById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Books, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, bookSchema_1.default.findById(req.params.id)];
            case 1:
                Books = _a.sent();
                res.status(200).json(Books);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                res.status(404).json({ err: err_2.message, success: false });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getBookById = getBookById;
var addNewBook = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Books, a1, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                Books = new bookSchema_1.default(req.body);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Books.save()];
            case 2:
                a1 = _a.sent();
                res
                    .status(200)
                    .json({ message: "Book is Added Successfully...", success: true });
                return [3 /*break*/, 4];
            case 3:
                err_3 = _a.sent();
                res.status(404).json({ err: err_3.message, success: false });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.addNewBook = addNewBook;
var deleteBook = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Books, a1, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, bookSchema_1.default.findById(req.params.id)];
            case 1:
                Books = _a.sent();
                return [4 /*yield*/, Books.remove()];
            case 2:
                a1 = _a.sent();
                res
                    .status(200)
                    .json({ message: "Book is Deleted Successfully...", success: true });
                return [3 /*break*/, 4];
            case 3:
                err_4 = _a.sent();
                res.status(404).json({ err: err_4.message, success: false });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteBook = deleteBook;
var updateBook = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var book, a1, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, bookSchema_1.default.findById(req.params.id)];
            case 1:
                book = _a.sent();
                book.ratings = req.body.ratings || book.ratings;
                book.votes = req.body.votes || book.votes;
                book.stock = req.body.stock || book.stock;
                book.authorImage = req.body.authorImage;
                if (req.body.discount) {
                    book.discount = req.body.discount;
                    book.price = book.price - (book.discount / 100) * book.price;
                }
                return [4 /*yield*/, book.save()];
            case 2:
                a1 = _a.sent();
                res
                    .status(200)
                    .json({ message: "Book is Updated Successfully...", success: true });
                return [3 /*break*/, 4];
            case 3:
                err_5 = _a.sent();
                res.status(404).json({ err: err_5.message, success: false });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateBook = updateBook;
exports.createbookReview = catchAsyncErrors_1.default(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, rating, comment, bookId, reviewedUser, review, book, isReviewed;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, rating = _a.rating, comment = _a.comment, bookId = _a.bookId;
                return [4 /*yield*/, userSchema_1.default.findById(req.user.id)];
            case 1:
                reviewedUser = _b.sent();
                review = {
                    user: req.user.id,
                    name: reviewedUser.name,
                    rating: Number(rating),
                    comment: comment
                };
                console.log("name", req.user.name);
                console.log("id", req.user.id);
                return [4 /*yield*/, bookSchema_1.default.findById(bookId)];
            case 2:
                book = _b.sent();
                isReviewed = book.reviews.find(function (r) { return r.user.toString() === req.user.id.toString(); });
                if (isReviewed) {
                    console.log("boo.reviews", book.reviews);
                    book.reviews.forEach(function (review) {
                        if (review.user.toString() === req.user.id.toString()) {
                            review.comment = comment;
                            review.rating = rating;
                        }
                    });
                }
                else {
                    console.log("boo.reviews", book.reviews);
                    book.reviews.push(review);
                    book.numOfReviews = book.reviews.length;
                }
                book.ratings = book.reviews.reduce(function (acc, item) { return item.rating + acc; }, 0) / book.reviews.length;
                return [4 /*yield*/, book.save()];
            case 3:
                _b.sent();
                //{ validateBeforeSave: false }
                res.status(200).json({
                    success: true
                });
                return [2 /*return*/];
        }
    });
}); });
exports.getBookReviews = catchAsyncErrors_1.default(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var book;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("querry", req.query);
                return [4 /*yield*/, bookSchema_1.default.findById(req.params.bookId)];
            case 1:
                book = _a.sent();
                res.status(200).json({
                    success: true,
                    reviews: book.reviews
                });
                return [2 /*return*/];
        }
    });
}); });
var getBookByAuthor = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var author, books, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                author = new RegExp(req.params.author, "i");
                return [4 /*yield*/, bookSchema_1.default.find({ author: author })];
            case 1:
                books = _a.sent();
                //    res.json(books)
                res.send(JSON.stringify(books));
                return [3 /*break*/, 3];
            case 2:
                err_6 = _a.sent();
                res.send("Error " + err_6);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getBookByAuthor = getBookByAuthor;
// export const getBookByText= async (req: any, res: any) => {
//   try {
//     const text = new RegExp(req.params.text, "i");
//     const books = await Book.find({author:text});
//     //    res.json(books)
//     res.send(books);
//   } catch (err) {
//     res.send("Error " + err);
//   }
// };
var getBooksByText = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var books;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, bookSchema_1.default.find({ $text: { $search: req.params.text.toString() } })];
            case 1:
                books = _a.sent();
                res.send(books);
                return [2 /*return*/];
        }
    });
}); };
exports.getBooksByText = getBooksByText;
var getBookByTitle = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var title, books, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                title = new RegExp(req.params.title, "i");
                return [4 /*yield*/, bookSchema_1.default.find({ title: title })];
            case 1:
                books = _a.sent();
                //    res.json(books)
                res.send(books);
                return [3 /*break*/, 3];
            case 2:
                err_7 = _a.sent();
                res.send("Error " + err_7);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getBookByTitle = getBookByTitle;
var getBookByRating = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var books, err_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, bookSchema_1.default.find({ ratings: { $gte: req.params.rating } })];
            case 1:
                books = _a.sent();
                // console.log(JSON.stringify(books))
                res.send(books);
                return [3 /*break*/, 3];
            case 2:
                err_8 = _a.sent();
                res.send("Error " + err_8);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getBookByRating = getBookByRating;
var getBookByPrice = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var books, err_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                console.log(req.params.min);
                return [4 /*yield*/, bookSchema_1.default.find({
                        $and: [
                            { price: { $gte: req.params.min } },
                            { price: { $lte: req.params.max } },
                        ],
                    })];
            case 1:
                books = _a.sent();
                // console.log(JSON.stringify(books))
                res.send(books);
                return [3 /*break*/, 3];
            case 2:
                err_9 = _a.sent();
                res.send("Error " + err_9);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getBookByPrice = getBookByPrice;
var getBookByTags = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var tag, books, err_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                tag = new RegExp(req.params.tag, "i");
                return [4 /*yield*/, bookSchema_1.default.find({ tags: tag })];
            case 1:
                books = _a.sent();
                //    res.json(books)
                res.send(books);
                return [3 /*break*/, 3];
            case 2:
                err_10 = _a.sent();
                res.send("Error " + err_10);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getBookByTags = getBookByTags;

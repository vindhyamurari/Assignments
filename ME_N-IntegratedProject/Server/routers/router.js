"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = __importDefault(require("express"));
var controllers_1 = require("../controllers/controllers");
var router = express_1.default.Router();
exports.router = router;
router.route('/books')
    .get(function (request, response) {
    if (request.query.q) {
        var search = '' + request.query.q;
        controllers_1.getBooksBySearchOnSimpleText(request, response, search);
    }
    else if (request.query.author) {
        var auth = '' + request.query.author;
        controllers_1.getBooksByAuthor(request, response, auth);
    }
    else if (request.query.title) {
        var title = '' + request.query.title;
        controllers_1.getBookByTitle(request, response, title);
    }
    else if (request.query['price']) {
        var prices = request.query['price'];
        controllers_1.getBooksInPriceRange(request, response, prices);
    }
    else if (request.query.rating) {
        var rating = '' + request.query.rating;
        controllers_1.getBooksLessThanGivenRating(request, response, rating);
    }
    else {
        controllers_1.getAllBooks(request, response);
    }
})
    .post(function (request, response) {
    controllers_1.postBook(request, response);
});
router.route('/books/:id')
    .get(function (request, response) {
    controllers_1.getBookById(request, response, request.params.id);
})
    .put(function (request, response) {
    controllers_1.updateBook(request, response, request.params.id);
})
    .delete(function (request, response) {
    controllers_1.deleteBook(request, response, request.params.id);
});

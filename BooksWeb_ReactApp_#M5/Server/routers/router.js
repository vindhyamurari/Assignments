"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = __importDefault(require("express"));
var controllers_1 = require("../controllers/controllers");
var userController_1 = require("../controllers/userController");
var router = express_1.default.Router();
exports.router = router;
router.get('/books/matching', function (request, response) {
    //console.log('in route')
    var search = '' + request.query.q;
    controllers_1.getBooksBySearchOnSimpleText(request, response, search);
});
router.route('/books')
    .get(function (request, response) {
    controllers_1.getAllBooks(request, response);
})
    .post(userController_1.isAuthorized, function (request, response) {
    console.log('secret way');
    controllers_1.postBook(request, response);
});
router.route('/books/:id')
    .get(function (request, response) {
    controllers_1.getBookById(request, response, request.params.id);
})
    .put(userController_1.isAuthorized, function (request, response) {
    controllers_1.updateBook(request, response, request.params.id);
})
    .patch(userController_1.isAuthorized, function (request, response) {
    controllers_1.patchBook(request, response, request.params.id);
})
    .delete(userController_1.isAuthorized, function (request, response) {
    controllers_1.deleteBook(request, response, request.params.id);
});
router.get('/books/by/:author', function (request, response) {
    controllers_1.getBooksByAuthor(request, response, request.params.author);
});
router.get('/books/priced/:min/:max', function (request, response) {
    controllers_1.getBooksInPriceRange(request, response, request.params.min, request.params.max);
});
router.get('/books/with-min-rating/:rating', function (request, response) {
    controllers_1.getBooksWithMinRating(request, response, request.params.rating);
});
router.post('/users/register', function (request, response) {
    userController_1.registerUser(request, response);
});
router.post('/users/login', function (request, response) {
    userController_1.loginUser(request, response);
});
router.post('/users/sendOTP', function (request, response) {
    userController_1.generateAndSendOTP(request, response);
});
router.post('/users/verifyOTP', function (request, response) {
    userController_1.recieveAndCheckOTP(request, response);
});

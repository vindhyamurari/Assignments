"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __importDefault(require("http"));
var controllers_1 = require("./controllers");
var port = 5000;
var hostname = '127.0.0.1';
var server = http_1.default.createServer(function (request, response) {
    var _a, _b, _c, _d;
    var queryString = (_a = request.url) === null || _a === void 0 ? void 0 : _a.split('?')[1];
    var reqURL = new URLSearchParams(queryString);
    if (request.url === '/books' && request.method == 'GET') {
        //call method to send all books 
        controllers_1.getAllBooks(request, response);
    }
    else if (((_b = request.url) === null || _b === void 0 ? void 0 : _b.match(/\/books\/[0-9]+/)) && request.method == 'GET') {
        var id = request.url.split('/')[2];
        //calling the method to get book by the given id
        controllers_1.getBookById(request, response, id);
    }
    else if (reqURL.has('q') && request.method == 'GET') {
        var simpleText = reqURL.get('q');
        // calling the function to get books that match given keyword
        if (simpleText)
            controllers_1.getBooksBySearchOnSimpleText(request, response, simpleText);
    }
    else if (reqURL.has('author') && request.method == 'GET') {
        var author = reqURL.get('author');
        //calling the function to get books that match given author
        if (author)
            controllers_1.getBooksByAuthor(request, response, author);
    }
    else if (reqURL.has('price') && request.method == 'GET') {
        var priceRange = reqURL.getAll('price');
        // calling the function to get books that are in the price range
        if (priceRange)
            controllers_1.getBooksInPriceRange(request, response, priceRange);
    }
    else if (request.url === '/books' && request.method == 'POST') {
        //calling the function to post the details of the book
        controllers_1.postBook(request, response);
    }
    else if (((_c = request.url) === null || _c === void 0 ? void 0 : _c.match(/\/books\/[0-9]+/)) && request.method == 'PUT') {
        var id = request.url.split('/')[2];
        //calling the function to put the details of the book
        controllers_1.updateBook(request, response, id);
    }
    else if (((_d = request.url) === null || _d === void 0 ? void 0 : _d.match(/\/books\/[0-9]+/)) && request.method == 'DELETE') {
        var id = request.url.split('/')[2];
        //calling the function to delete the particular book by id
        controllers_1.deleteBook(request, response, id);
    }
    else {
        response.end("Url not found");
    }
});
//check if the port is not ready to be used
server.on('error', function (err) {
    console.log(err.message);
});
//make the server active by listening to the port number 
server.listen(port, hostname, function () {
    console.log("Server running at http://" + hostname + ":" + port);
});
//# sourceMappingURL=server.js.map
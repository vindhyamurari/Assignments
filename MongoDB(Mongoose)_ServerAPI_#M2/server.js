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
var http_1 = __importDefault(require("http"));
var controllers_1 = require("./controllers/controllers");
var connection_1 = require("./models/connection");
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
        var priceRange = reqURL.getAll('price'); //['200','400']
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
server.listen(port, hostname, function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Server running at http://" + hostname + ":" + port);
                return [4 /*yield*/, connection_1.connectionToDB()
                        .then(function (response) {
                        console.log(response);
                    })
                        .catch(function (error) {
                        console.log(error.message);
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });

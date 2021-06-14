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
var movieSchema_1 = __importDefault(require("../models/movieSchema"));
var userSchema_1 = require("../models/userSchema");
var node_fetch_1 = __importDefault(require("node-fetch"));
var UserController = /** @class */ (function () {
    function UserController() {
        var _this = this;
        this.getMovieByImdbId = function (request, response) { return __awaiter(_this, void 0, void 0, function () {
            var imdbID, movieInDB, fetch_response, movieFromOMDB, newMovie, err_1, err_2, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 11, , 12]);
                        imdbID = request.params.imdbID;
                        return [4 /*yield*/, movieSchema_1.default.findOne({ imdbID: imdbID })];
                    case 1:
                        movieInDB = _a.sent();
                        if (!movieInDB) return [3 /*break*/, 2];
                        response.status(200).send({ success: true, message: 'Found From Database', movie: movieInDB });
                        return [3 /*break*/, 10];
                    case 2:
                        _a.trys.push([2, 9, , 10]);
                        return [4 /*yield*/, node_fetch_1.default("http://www.omdbapi.com/?i=" + imdbID + "&apikey=f746a82b")];
                    case 3:
                        fetch_response = _a.sent();
                        return [4 /*yield*/, fetch_response.json()];
                    case 4:
                        movieFromOMDB = _a.sent();
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 7, , 8]);
                        newMovie = new movieSchema_1.default(movieFromOMDB);
                        return [4 /*yield*/, movieSchema_1.default.create(newMovie)];
                    case 6:
                        newMovie = _a.sent();
                        response.status(200).send({ success: true, message: 'Found From Newly Added In Database', movie: newMovie });
                        return [3 /*break*/, 8];
                    case 7:
                        err_1 = _a.sent();
                        response.status(404).send({ success: false, message: err_1.message, info: "Cannot add data from OMDB to Movies" });
                        return [3 /*break*/, 8];
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        err_2 = _a.sent();
                        response.status(404).send({ success: false, message: err_2.message, info: "Cannot fetch from OMDB" });
                        return [3 /*break*/, 10];
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        err_3 = _a.sent();
                        response.status(404).send({ success: false, message: err_3.message });
                        return [3 /*break*/, 12];
                    case 12: return [2 /*return*/];
                }
            });
        }); };
        this.getMovieByText = function (request, response) { return __awaiter(_this, void 0, void 0, function () {
            var searchText, fetch_response, moviesFromOMDB, _i, _a, movie, movieInDB, fetch_response_1, movieFromOMDB, newMovie, err_4, err_5, err_6, err_7, err_8;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 21, , 22]);
                        searchText = request.params.text;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 19, , 20]);
                        return [4 /*yield*/, node_fetch_1.default("http://www.omdbapi.com/?s=" + searchText + "&apikey=f746a82b")];
                    case 2:
                        fetch_response = _b.sent();
                        return [4 /*yield*/, fetch_response.json()];
                    case 3:
                        moviesFromOMDB = _b.sent();
                        _b.label = 4;
                    case 4:
                        _b.trys.push([4, 17, , 18]);
                        _i = 0, _a = moviesFromOMDB.Search;
                        _b.label = 5;
                    case 5:
                        if (!(_i < _a.length)) return [3 /*break*/, 16];
                        movie = _a[_i];
                        return [4 /*yield*/, movieSchema_1.default.findOne({ imdbID: movie.imdbID })];
                    case 6:
                        movieInDB = _b.sent();
                        if (!!movieInDB) return [3 /*break*/, 15];
                        _b.label = 7;
                    case 7:
                        _b.trys.push([7, 14, , 15]);
                        return [4 /*yield*/, node_fetch_1.default("http://www.omdbapi.com/?i=" + movie.imdbID + "&apikey=f746a82b")];
                    case 8:
                        fetch_response_1 = _b.sent();
                        return [4 /*yield*/, fetch_response_1.json()];
                    case 9:
                        movieFromOMDB = _b.sent();
                        _b.label = 10;
                    case 10:
                        _b.trys.push([10, 12, , 13]);
                        newMovie = new movieSchema_1.default(movieFromOMDB);
                        return [4 /*yield*/, movieSchema_1.default.create(newMovie)];
                    case 11:
                        newMovie = _b.sent();
                        return [3 /*break*/, 13];
                    case 12:
                        err_4 = _b.sent();
                        console.log('Error while adding message into database', err_4.message);
                        return [3 /*break*/, 13];
                    case 13: return [3 /*break*/, 15];
                    case 14:
                        err_5 = _b.sent();
                        console.log('Error while fetching movies while getting all info and adding into database', err_5.message);
                        return [3 /*break*/, 15];
                    case 15:
                        _i++;
                        return [3 /*break*/, 5];
                    case 16: return [3 /*break*/, 18];
                    case 17:
                        err_6 = _b.sent();
                        response.status(404).send({ success: false, message: err_6.message, info: "Cannot add data from OMDB to Movies" });
                        return [3 /*break*/, 18];
                    case 18:
                        response.status(200).send({ success: true, message: "Sending from OMDB", searchedMovies: moviesFromOMDB.Search });
                        return [3 /*break*/, 20];
                    case 19:
                        err_7 = _b.sent();
                        response.status(404).send({ success: false, message: err_7.message, info: 'Error in fetch' });
                        return [3 /*break*/, 20];
                    case 20: return [3 /*break*/, 22];
                    case 21:
                        err_8 = _b.sent();
                        response.status(404).send({ success: false, message: err_8.message });
                        return [3 /*break*/, 22];
                    case 22: return [2 /*return*/];
                }
            });
        }); };
        this.getTopRatedMovies = function (request, response) { return __awaiter(_this, void 0, void 0, function () {
            var topRatedMovies, err_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, movieSchema_1.default.find({ imdbRating: { $ne: 'N/A' } }).sort({ imdbRating: -1 }).limit(8)];
                    case 1:
                        topRatedMovies = _a.sent();
                        response.status(200).send({ success: true, message: 'Found From Database', topRatedMovies: topRatedMovies });
                        return [3 /*break*/, 3];
                    case 2:
                        err_9 = _a.sent();
                        response.status(404).send({ success: false, message: err_9.message });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getMovieOfPageNumber = function (request, response) { return __awaiter(_this, void 0, void 0, function () {
            var text, pageNumber, fetch_response, movieFromOMDB, err_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        text = request.params.text;
                        pageNumber = request.params.pageNumber;
                        return [4 /*yield*/, node_fetch_1.default("http://www.omdbapi.com/?s=" + text + "&page=" + pageNumber + "&apikey=f746a82b")];
                    case 1:
                        fetch_response = _a.sent();
                        return [4 /*yield*/, fetch_response.json()];
                    case 2:
                        movieFromOMDB = _a.sent();
                        if (movieFromOMDB.Response === false) {
                            response.status(404).send({ success: false, message: 'No Result Found' });
                        }
                        response.status(200).send({ success: true, message: "Found From Page Number " + pageNumber, movies: movieFromOMDB.Search });
                        return [3 /*break*/, 4];
                    case 3:
                        err_10 = _a.sent();
                        response.status(404).send({ success: false, message: err_10.message });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.getBookMarkedMoviesOfUser = function (request, response) { return __awaiter(_this, void 0, void 0, function () {
            var userID, user, bookmarkedMovies, err_11, err_12, err_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 9, , 10]);
                        userID = request.params.userID;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, , 8]);
                        return [4 /*yield*/, userSchema_1.users.findById(userID)];
                    case 2:
                        user = _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, movieSchema_1.default.find({ imdbID: { $in: user.bookmarks } })];
                    case 4:
                        bookmarkedMovies = _a.sent();
                        response.status(200).send({ success: true, message: 'Book Marked Movies', bookmarkedMovies: bookmarkedMovies });
                        return [3 /*break*/, 6];
                    case 5:
                        err_11 = _a.sent();
                        response.status(404).send({ success: false, message: err_11.message });
                        return [3 /*break*/, 6];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        err_12 = _a.sent();
                        response.status(404).send({ success: false, message: 'User Not Found' });
                        return [3 /*break*/, 8];
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        err_13 = _a.sent();
                        response.status(404).send({ success: false, message: err_13.message });
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        }); };
    }
    return UserController;
}());
exports.default = UserController;

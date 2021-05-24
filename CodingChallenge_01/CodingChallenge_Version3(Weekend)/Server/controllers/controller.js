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
exports.getAllMovies = exports.getMovieInfo = exports.addNewMovie = exports.deleteOneMovie = exports.getDirectorInfo = exports.updateDirectorDetails = exports.addNewDirector = exports.getAllDirectors = void 0;
var directorsSchema_1 = require("../models/directorsSchema");
var movieSchema_1 = require("../models/movieSchema");
//GET All Directors 
function getAllDirectors(request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var allDirectors, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, directorsSchema_1.directors.find()];
                case 1:
                    allDirectors = _a.sent();
                    return [2 /*return*/, response.status(200).send({ success: true, message: "Fetched All Directors", allDirectors: allDirectors })];
                case 2:
                    err_1 = _a.sent();
                    return [2 /*return*/, response.status(404).send({ success: false, message: 'Something Went Wrong Try Again' })];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getAllDirectors = getAllDirectors;
//POST a new Director
function addNewDirector(request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var director, err_2, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    director = new directorsSchema_1.directors();
                    director = __assign({}, request.body);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, directorsSchema_1.directors.create(director)];
                case 2:
                    director = _a.sent();
                    return [2 /*return*/, response.status(201).send({ success: true, message: 'New Director Added', director: director })];
                case 3:
                    err_2 = _a.sent();
                    return [2 /*return*/, response.status(404).send({ success: false, message: 'Director Already Present' })];
                case 4: return [3 /*break*/, 6];
                case 5:
                    err_3 = _a.sent();
                    return [2 /*return*/, response.status(404).send({ success: false, message: 'Something Went Wrong Try Again' })];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.addNewDirector = addNewDirector;
//PATCH the director age or awardCount
function updateDirectorDetails(request, response, name) {
    return __awaiter(this, void 0, void 0, function () {
        var director, newDetails, err_4, err_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 8, , 9]);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, directorsSchema_1.directors.findOne({ name: name })];
                case 2:
                    director = _a.sent();
                    if (!director) return [3 /*break*/, 4];
                    newDetails = new directorsSchema_1.directors();
                    newDetails = __assign({}, request.body);
                    return [4 /*yield*/, directorsSchema_1.directors.findByIdAndUpdate(director._id, newDetails, { new: true })];
                case 3:
                    newDetails = _a.sent();
                    return [2 /*return*/, response.status(200).send({ success: true, message: 'Director details Updated', newDetails: newDetails })];
                case 4: return [2 /*return*/, response.status(404).send({ success: false, message: 'Director Not Found' })];
                case 5: return [3 /*break*/, 7];
                case 6:
                    err_4 = _a.sent();
                    return [2 /*return*/, response.status(404).send({ success: false, message: 'Couldnt Update Director Details' })];
                case 7: return [3 /*break*/, 9];
                case 8:
                    err_5 = _a.sent();
                    return [2 /*return*/, response.status(404).send({ success: false, message: 'Something Went Wrong Try Again' })];
                case 9: return [2 /*return*/];
            }
        });
    });
}
exports.updateDirectorDetails = updateDirectorDetails;
//GET All Directors 
function getAllMovies(request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var allMovies, err_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, movieSchema_1.movies.find()];
                case 1:
                    allMovies = _a.sent();
                    return [2 /*return*/, response.status(200).send({ success: true, message: "Fetched All Movies", allMovies: allMovies })];
                case 2:
                    err_6 = _a.sent();
                    return [2 /*return*/, response.status(404).send({ success: false, message: 'Something Went Wrong Try Again' })];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getAllMovies = getAllMovies;
//GET all the movie details on the director name given
function getDirectorInfo(request, response, name) {
    return __awaiter(this, void 0, void 0, function () {
        var director, allMoviesOfGivenDirector, allMoviesFromDB, each_Movies, _i, allMoviesFromDB_1, _a, _b, each_director, err_7, err_8;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 8, , 9]);
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, directorsSchema_1.directors.findOne({ name: name })];
                case 2:
                    director = _c.sent();
                    if (!director) return [3 /*break*/, 4];
                    allMoviesOfGivenDirector = [];
                    return [4 /*yield*/, movieSchema_1.movies.find()];
                case 3:
                    allMoviesFromDB = _c.sent();
                    each_Movies = void 0;
                    for (_i = 0, allMoviesFromDB_1 = allMoviesFromDB; _i < allMoviesFromDB_1.length; _i++) {
                        each_Movies = allMoviesFromDB_1[_i];
                        for (_a = 0, _b = each_Movies.directors; _a < _b.length; _a++) {
                            each_director = _b[_a];
                            if (each_director === name)
                                allMoviesOfGivenDirector.push(each_Movies);
                        }
                    }
                    return [2 /*return*/, response.status(200).send({ success: true, message: 'Director details Updated', allMoviesOfGivenDirector: allMoviesOfGivenDirector, director: director })];
                case 4: return [2 /*return*/, response.status(404).send({ success: false, message: 'Director Not Found' })];
                case 5: return [3 /*break*/, 7];
                case 6:
                    err_7 = _c.sent();
                    return [2 /*return*/, response.status(404).send({ success: false, message: 'Couldnt Update Director Details' })];
                case 7: return [3 /*break*/, 9];
                case 8:
                    err_8 = _c.sent();
                    return [2 /*return*/, response.status(404).send({ success: false, message: 'Something Went Wrong Try Again' })];
                case 9: return [2 /*return*/];
            }
        });
    });
}
exports.getDirectorInfo = getDirectorInfo;
//DELETE the given movie
function deleteOneMovie(request, response, name) {
    return __awaiter(this, void 0, void 0, function () {
        var movie, err_9, err_10;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 8, , 9]);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, movieSchema_1.movies.findOne({ name: name })];
                case 2:
                    movie = _a.sent();
                    if (!movie) return [3 /*break*/, 4];
                    return [4 /*yield*/, movieSchema_1.movies.findByIdAndRemove(movie._id)];
                case 3:
                    movie = _a.sent();
                    return [2 /*return*/, response.status(200).send({ success: true, message: 'Movie Deleted' })];
                case 4: return [2 /*return*/, response.status(404).send({ success: false, message: 'Movie Not Found' })];
                case 5: return [3 /*break*/, 7];
                case 6:
                    err_9 = _a.sent();
                    return [2 /*return*/, response.status(404).send({ success: false, message: 'Couldnt Delete Movie' })];
                case 7: return [3 /*break*/, 9];
                case 8:
                    err_10 = _a.sent();
                    return [2 /*return*/, response.status(404).send({ success: false, message: 'Something Went Wrong Try Again' })];
                case 9: return [2 /*return*/];
            }
        });
    });
}
exports.deleteOneMovie = deleteOneMovie;
//POST a new Movie
function addNewMovie(request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var movie, each_director, helper, allDirectorsfromDB, _i, _a, one_director, _b, allDirectorsfromDB_1, err_11, err_12, err_13;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 11, , 12]);
                    movie = new movieSchema_1.movies();
                    movie = __assign({}, request.body);
                    each_director = void 0;
                    helper = 0;
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 9, , 10]);
                    return [4 /*yield*/, directorsSchema_1.directors.find()];
                case 2:
                    allDirectorsfromDB = _c.sent();
                    for (_i = 0, _a = movie.directors; _i < _a.length; _i++) {
                        one_director = _a[_i];
                        for (_b = 0, allDirectorsfromDB_1 = allDirectorsfromDB; _b < allDirectorsfromDB_1.length; _b++) {
                            each_director = allDirectorsfromDB_1[_b];
                            if (one_director === each_director.name) {
                                helper++;
                                continue;
                            }
                        }
                    }
                    if (!(helper === movie.directors.length)) return [3 /*break*/, 7];
                    _c.label = 3;
                case 3:
                    _c.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, movieSchema_1.movies.create(movie)];
                case 4:
                    movie = _c.sent();
                    return [2 /*return*/, response.status(201).send({ success: true, message: 'New Movie Added', movie: movie })];
                case 5:
                    err_11 = _c.sent();
                    return [2 /*return*/, response.status(404).send({ success: false, message: 'Movie Already Present' })];
                case 6: return [3 /*break*/, 8];
                case 7: return [2 /*return*/, response.status(404).send({ success: false, message: 'Please Register the Director before Adding Movie' })];
                case 8: return [3 /*break*/, 10];
                case 9:
                    err_12 = _c.sent();
                    return [3 /*break*/, 10];
                case 10: return [3 /*break*/, 12];
                case 11:
                    err_13 = _c.sent();
                    return [2 /*return*/, response.status(404).send({ success: false, message: 'Something Went Wrong Try Again' })];
                case 12: return [2 /*return*/];
            }
        });
    });
}
exports.addNewMovie = addNewMovie;
//GET all the directors details on the movie name given
function getMovieInfo(request, response, name) {
    return __awaiter(this, void 0, void 0, function () {
        var movie, allDirectors, movieDirectors, _i, _a, M_director, _b, allDirectors_1, D_director, err_14, err_15;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 8, , 9]);
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, movieSchema_1.movies.findOne({ name: name })];
                case 2:
                    movie = _c.sent();
                    if (!movie) return [3 /*break*/, 4];
                    return [4 /*yield*/, directorsSchema_1.directors.find()];
                case 3:
                    allDirectors = _c.sent();
                    movieDirectors = [];
                    for (_i = 0, _a = movie.directors; _i < _a.length; _i++) {
                        M_director = _a[_i];
                        for (_b = 0, allDirectors_1 = allDirectors; _b < allDirectors_1.length; _b++) {
                            D_director = allDirectors_1[_b];
                            if (M_director === D_director.name) {
                                movieDirectors.push(D_director);
                            }
                        }
                    }
                    return [2 /*return*/, response.status(200).send({ success: true, movieDirectorsDetails: movieDirectors })];
                case 4: return [2 /*return*/, response.status(404).send({ success: false, message: 'Movie Not Found' })];
                case 5: return [3 /*break*/, 7];
                case 6:
                    err_14 = _c.sent();
                    return [2 /*return*/, response.status(404).send({ success: false, message: 'Couldnt Delete Movie' })];
                case 7: return [3 /*break*/, 9];
                case 8:
                    err_15 = _c.sent();
                    return [2 /*return*/, response.status(404).send({ success: false, message: 'Something Went Wrong Try Again' })];
                case 9: return [2 /*return*/];
            }
        });
    });
}
exports.getMovieInfo = getMovieInfo;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var movieController_1 = __importDefault(require("../controllers/movieController"));
var movieRoute = function () {
    var movieRouter = express_1.default.Router();
    var movieController = new movieController_1.default();
    movieRouter.get('/imdb-id/:imdbID', function (request, response) {
        movieController.getMovieByImdbId(request, response);
    });
    movieRouter.get('/search/containing/:text', function (request, response) {
        movieController.getMovieByText(request, response);
    });
    movieRouter.get('/top-rated-movies', function (request, response) {
        movieController.getTopRatedMovies(request, response);
    });
    movieRouter.get('/search/:text/page/:pageNumber', function (request, response) {
        movieController.getMovieOfPageNumber(request, response);
    });
    movieRouter.get('/book-marked/by-user/:userID', function (request, response) {
        movieController.getBookMarkedMoviesOfUser(request, response);
    });
    return movieRouter;
};
exports.default = movieRoute;

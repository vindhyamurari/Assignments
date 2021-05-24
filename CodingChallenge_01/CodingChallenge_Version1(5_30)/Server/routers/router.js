"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = __importDefault(require("express"));
var controller_1 = require("../controllers/controller");
var router = express_1.default.Router();
exports.router = router;
//POST a new Director
router.post('/directors', function (request, response) {
    controller_1.addNewDirector(request, response);
});
//PATCH the director age or awardCount
router.patch('/director/:name', function (request, response) {
    controller_1.updateDirectorDetails(request, response, request.params.name);
});
//GET all the movie details on the director name given
router.get('/director/:name', function (request, response) {
    controller_1.getDirectorInfo(request, response, request.params.name);
});
//DELETE the given movie
router.delete('/movie/:name', function (request, response) {
    controller_1.deleteOneMovie(request, response, request.params.name);
});
//POST a new Movie
router.post('/movies', function (request, response) {
    controller_1.addNewMovie(request, response);
});
//GET all the directors details on the movie name given 
router.get('/movie/:name', function (request, response) {
    controller_1.getMovieInfo(request, response, request.params.name);
});

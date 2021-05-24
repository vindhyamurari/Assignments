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
router.route('/director/:name')
    //PATCH the director age or awardCount
    .patch(function (request, response) {
    controller_1.updateDirectorDetails(request, response, request.params.name);
})
    //GET all the movie details on the director name given
    .get(function (request, response) {
    controller_1.getDirectorInfo(request, response, request.params.name);
});
//POST a new Movie
router.post('/movies', function (request, response) {
    controller_1.addNewMovie(request, response);
});
router.route('/movie/:name')
    //GET all the directors details on the movie name given 
    .get(function (request, response) {
    controller_1.getMovieInfo(request, response, request.params.name);
})
    //DELETE the given movie
    .delete(function (request, response) {
    controller_1.deleteOneMovie(request, response, request.params.name);
});

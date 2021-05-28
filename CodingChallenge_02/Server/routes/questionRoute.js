"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.questionRouter = void 0;
var express_1 = __importDefault(require("express"));
var questionController_1 = require("../controllers/questionController");
var userController_1 = require("../controllers/userController");
var questionRouter = express_1.default.Router();
exports.questionRouter = questionRouter;
questionRouter.route('/')
    .get(function (request, response) {
    questionController_1.getAllQuestions(request, response);
})
    .post(userController_1.isAuthorized, function (request, response) {
    console.log('in question router');
    questionController_1.postQuestion(request, response);
});
questionRouter.route('/:id')
    .get(function (request, response) {
    questionController_1.getQuestionById(request, response);
})
    .patch(userController_1.isAuthorized, function (request, response) {
    if (request.body.voteType === 'upVote') {
        questionController_1.upVoteQuestion(request, response);
    }
    if (request.body.voteType === 'downVote') {
        questionController_1.downVoteQuestion(request, response);
    }
});
questionRouter.get('/category/:category', function (request, response) {
    questionController_1.getQuestionByCategory(request, response);
});
questionRouter.get('/search/:text', function (request, response) {
    questionController_1.getQuestionByTextSearch(request, response);
});

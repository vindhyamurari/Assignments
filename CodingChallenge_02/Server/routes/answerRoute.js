"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.answerRouter = void 0;
var express_1 = __importDefault(require("express"));
var answerController_1 = require("../controllers/answerController");
var userController_1 = require("../controllers/userController");
var answerRouter = express_1.default.Router();
exports.answerRouter = answerRouter;
answerRouter.route('/for-question/:id')
    .get(function (request, response) {
    answerController_1.getAllAnswersForQuestion(request, response);
})
    .post(userController_1.isAuthorized, function (request, response) {
    answerController_1.postAnswerForQuestion(request, response);
});
answerRouter.patch('/:id', userController_1.isAuthorized, function (request, response) {
    if (request.body.voteType === 'upVote') {
        answerController_1.upVoteAnswer(request, response);
    }
    if (request.body.voteType === 'downVote') {
        answerController_1.downVoteAnswer(request, response);
    }
});

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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downVoteAnswer = exports.upVoteAnswer = exports.postAnswerForQuestion = exports.getAllAnswersForQuestion = void 0;
var answersSchema_1 = require("../models/answersSchema");
var questionSchema_1 = require("../models/questionSchema");
function getAllAnswersForQuestion(request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var id, questionfromDB, answerArray, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = request.params.id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, questionSchema_1.questions.findById(id)];
                case 2:
                    questionfromDB = _a.sent();
                    if (!questionfromDB) return [3 /*break*/, 4];
                    return [4 /*yield*/, answersSchema_1.answers.find({ questionId: id })];
                case 3:
                    answerArray = _a.sent();
                    return [2 /*return*/, response.status(200).send({ success: true, answerArray: answerArray })];
                case 4: return [2 /*return*/, response.status(404).send({ success: false, message: "Cannot find the Question" })];
                case 5: return [3 /*break*/, 7];
                case 6:
                    error_1 = _a.sent();
                    return [2 /*return*/, response.status(404).send({ success: false, message: "Something Went Wrong Please Try Again" })];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.getAllAnswersForQuestion = getAllAnswersForQuestion;
function postAnswerForQuestion(request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var id, questionfromDB, newAnswer, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = request.params.id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, questionSchema_1.questions.findById(id)];
                case 2:
                    questionfromDB = _a.sent();
                    if (!questionfromDB) return [3 /*break*/, 4];
                    newAnswer = new answersSchema_1.answers({
                        answer: request.body.answer,
                        questionId: id,
                        userId: request.user._id
                    });
                    return [4 /*yield*/, answersSchema_1.answers.create(newAnswer)];
                case 3:
                    newAnswer = _a.sent();
                    return [2 /*return*/, response.status(201).send({ success: true, newAnswer: newAnswer })];
                case 4: return [2 /*return*/, response.status(404).send({ success: false, message: "Cannot find the Question" })];
                case 5: return [3 /*break*/, 7];
                case 6:
                    error_2 = _a.sent();
                    return [2 /*return*/, response.status(404).send({ success: false, message: "Something Went Wrong Please Try Again" })];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.postAnswerForQuestion = postAnswerForQuestion;
function upVoteAnswer(request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var id, answerfromDB, userFound, upCountPlus, _a, error_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    id = request.params.id;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 11, , 12]);
                    return [4 /*yield*/, answersSchema_1.answers.findById(id)];
                case 2:
                    answerfromDB = _b.sent();
                    if (!answerfromDB) return [3 /*break*/, 9];
                    _b.label = 3;
                case 3:
                    _b.trys.push([3, 7, , 8]);
                    userFound = answerfromDB.upVoteCount.likedUsers.find(function (userId) { return userId == request.user._id.toString(); });
                    if (!(userFound !== undefined)) return [3 /*break*/, 4];
                    return [2 /*return*/, response.status(404).send({ success: false, message: "User cannot Like more than once" })];
                case 4:
                    answerfromDB.upVoteCount.likedUsers.push(request.user._id);
                    upCountPlus = new answersSchema_1.answers();
                    upCountPlus = {
                        answer: answerfromDB.answer,
                        questionId: answerfromDB.questionId,
                        userId: answerfromDB.userId,
                        upVoteCount: {
                            count: answerfromDB.upVoteCount.count + 1,
                            likedUsers: __spreadArray([], answerfromDB.upVoteCount.likedUsers)
                        },
                        downVoteCount: answerfromDB.downVoteCount
                    };
                    return [4 /*yield*/, answersSchema_1.answers.findByIdAndUpdate(id, upCountPlus, { new: true })];
                case 5:
                    upCountPlus = _b.sent();
                    return [2 /*return*/, response.status(200).send({ success: true, upCountPlus: upCountPlus })];
                case 6: return [3 /*break*/, 8];
                case 7:
                    _a = _b.sent();
                    return [2 /*return*/, response.status(404).send({ success: false, message: "Cannot Like the Answer" })];
                case 8: return [3 /*break*/, 10];
                case 9: return [2 /*return*/, response.status(404).send({ success: false, message: "Cannot find the Answer" })];
                case 10: return [3 /*break*/, 12];
                case 11:
                    error_3 = _b.sent();
                    return [2 /*return*/, response.status(404).send({ success: false, message: "Something Went Wrong Please Try Again" })];
                case 12: return [2 /*return*/];
            }
        });
    });
}
exports.upVoteAnswer = upVoteAnswer;
function downVoteAnswer(request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var id, answerfromDB, userFound, downCountPlus, _a, error_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    id = request.params.id;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 11, , 12]);
                    return [4 /*yield*/, answersSchema_1.answers.findById(id)];
                case 2:
                    answerfromDB = _b.sent();
                    if (!answerfromDB) return [3 /*break*/, 9];
                    _b.label = 3;
                case 3:
                    _b.trys.push([3, 7, , 8]);
                    userFound = answerfromDB.downVoteCount.likedUsers.find(function (userId) { return userId == request.user._id.toString(); });
                    if (!(userFound !== undefined)) return [3 /*break*/, 4];
                    return [2 /*return*/, response.status(404).send({ success: false, message: "User cannot Dis-Like more than once" })];
                case 4:
                    answerfromDB.downVoteCount.likedUsers.push(request.user._id);
                    downCountPlus = new answersSchema_1.answers();
                    downCountPlus = {
                        answer: answerfromDB.answer,
                        questionId: answerfromDB.questionId,
                        userId: answerfromDB.userId,
                        upVoteCount: answerfromDB.upVoteCount,
                        downVoteCount: {
                            count: answerfromDB.downVoteCount.count + 1,
                            likedUsers: __spreadArray([], answerfromDB.downVoteCount.likedUsers)
                        }
                    };
                    return [4 /*yield*/, answersSchema_1.answers.findByIdAndUpdate(id, downCountPlus, { new: true })];
                case 5:
                    downCountPlus = _b.sent();
                    return [2 /*return*/, response.status(200).send({ success: true, downCountPlus: downCountPlus })];
                case 6: return [3 /*break*/, 8];
                case 7:
                    _a = _b.sent();
                    return [2 /*return*/, response.status(404).send({ success: false, message: "Cannot Dis-Like the Answer" })];
                case 8: return [3 /*break*/, 10];
                case 9: return [2 /*return*/, response.status(404).send({ success: false, message: "Cannot find the Answer" })];
                case 10: return [3 /*break*/, 12];
                case 11:
                    error_4 = _b.sent();
                    return [2 /*return*/, response.status(404).send({ success: false, message: "Something Went Wrong Please Try Again" })];
                case 12: return [2 /*return*/];
            }
        });
    });
}
exports.downVoteAnswer = downVoteAnswer;

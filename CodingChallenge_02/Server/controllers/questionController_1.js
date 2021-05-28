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
exports.downVoteQuestion = exports.upVoteQuestion = exports.getQuestionByTextSearch = exports.getQuestionByCategory = exports.getQuestionById = exports.handleQuestionContollerFunctions = void 0;
var questionSchema_1 = require("../models/questionSchema");
function outerFunction(request, response) {
    return {
        getAllQuestions: function getAllQuestions() {
            return __awaiter(this, void 0, void 0, function () {
                var allQuestions;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, questionSchema_1.questions.find()];
                        case 1:
                            allQuestions = _a.sent();
                            if (allQuestions) {
                                return [2 /*return*/, allQuestions];
                            }
                            else
                                throw new Error('Questions Not Found');
                            return [2 /*return*/];
                    }
                });
            });
        },
        postQuestion: function postQuestion() {
            return __awaiter(this, void 0, void 0, function () {
                var newQuestion;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            newQuestion = new questionSchema_1.questions(__assign(__assign({}, request.body), { userId: request.user._id }));
                            if (!newQuestion) return [3 /*break*/, 2];
                            return [4 /*yield*/, questionSchema_1.questions.create(newQuestion)];
                        case 1:
                            newQuestion = _a.sent();
                            return [2 /*return*/, newQuestion];
                        case 2: throw new Error('Cannot Post A Question');
                    }
                });
            });
        }
    };
}
function handleQuestionContollerFunctions(request, response, funcName) {
    return __awaiter(this, void 0, void 0, function () {
        var questionControllerFuncs, data, _a, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    questionControllerFuncs = outerFunction(request, response);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 7, , 8]);
                    data = void 0;
                    _a = funcName;
                    switch (_a) {
                        case 'getAllQuestions': return [3 /*break*/, 2];
                        case 'postQuestion': return [3 /*break*/, 4];
                    }
                    return [3 /*break*/, 6];
                case 2: return [4 /*yield*/, questionControllerFuncs.getAllQuestions()];
                case 3:
                    data = _b.sent();
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, questionControllerFuncs.postQuestion()];
                case 5:
                    data = _b.sent();
                    return [3 /*break*/, 6];
                case 6:
                    response.status(200).send({ data: data });
                    return [3 /*break*/, 8];
                case 7:
                    err_1 = _b.sent();
                    return [2 /*return*/, response.status(404).send(err_1)];
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.handleQuestionContollerFunctions = handleQuestionContollerFunctions;
//GET question by Id
function getQuestionById(request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var id, question, error_1, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    id = request.params.id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, questionSchema_1.questions.findById(id)];
                case 2:
                    question = _a.sent();
                    return [2 /*return*/, response.status(200).send({ success: true, question: question })];
                case 3:
                    error_1 = _a.sent();
                    return [2 /*return*/, response.status(404).send({ success: false, message: "Cannot find the Question" })];
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_2 = _a.sent();
                    return [2 /*return*/, response.status(404).send({ success: false, message: "Something went wrong Please Try again" })];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.getQuestionById = getQuestionById;
//GET question by Category
function getQuestionByCategory(request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var categoryName, allQuestion, error_3, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    categoryName = request.params.category;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, questionSchema_1.questions.find({ category: new RegExp(categoryName, "i") })];
                case 2:
                    allQuestion = _a.sent();
                    return [2 /*return*/, response.status(200).send({ success: true, allQuestion: allQuestion })];
                case 3:
                    error_3 = _a.sent();
                    return [2 /*return*/, response.status(404).send({ success: false, message: "Cannot find the Question" })];
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_4 = _a.sent();
                    return [2 /*return*/, response.status(404).send({ success: false, message: "Something went wrong Please Try again" })];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.getQuestionByCategory = getQuestionByCategory;
//GET question by Search Text
function getQuestionByTextSearch(request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var searchText, question, error_5, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    searchText = request.params.text;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, questionSchema_1.questions.find({ question: new RegExp(searchText, "i") })];
                case 2:
                    question = _a.sent();
                    return [2 /*return*/, response.status(200).send({ success: true, question: question })];
                case 3:
                    error_5 = _a.sent();
                    return [2 /*return*/, response.status(404).send({ success: false, message: "Cannot find the Question" })];
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_6 = _a.sent();
                    return [2 /*return*/, response.status(404).send({ success: false, message: "Something went wrong Please Try again" })];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.getQuestionByTextSearch = getQuestionByTextSearch;
//PATCH question for Up Vote
function upVoteQuestion(request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var id, questionfromDB, upCountPlus, _a, error_7, error_8;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 9, , 10]);
                    id = request.params.id;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 7, , 8]);
                    return [4 /*yield*/, questionSchema_1.questions.findById(id)];
                case 2:
                    questionfromDB = _b.sent();
                    _b.label = 3;
                case 3:
                    _b.trys.push([3, 5, , 6]);
                    upCountPlus = new questionSchema_1.questions();
                    upCountPlus = {
                        question: questionfromDB.question,
                        category: questionfromDB.category,
                        answerId: questionfromDB.answerId,
                        upVoteCount: questionfromDB.upVoteCount + 1,
                        downVoteCount: questionfromDB.downVoteCount,
                        userId: questionfromDB.userId
                    };
                    return [4 /*yield*/, questionSchema_1.questions.findByIdAndUpdate(id, upCountPlus, { new: true })];
                case 4:
                    upCountPlus = _b.sent();
                    return [2 /*return*/, response.status(200).send({ success: true, upCountPlus: upCountPlus })];
                case 5:
                    _a = _b.sent();
                    return [2 /*return*/, response.status(404).send({ success: false, message: "Cannot Update the Up Vote Count" })];
                case 6: return [3 /*break*/, 8];
                case 7:
                    error_7 = _b.sent();
                    return [2 /*return*/, response.status(404).send({ success: false, message: "Cannot find the Question" })];
                case 8: return [3 /*break*/, 10];
                case 9:
                    error_8 = _b.sent();
                    return [2 /*return*/, response.status(404).send({ success: false, message: "Something went wrong Please Try again" })];
                case 10: return [2 /*return*/];
            }
        });
    });
}
exports.upVoteQuestion = upVoteQuestion;
//PATCH question for down Vote
function downVoteQuestion(request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var id, questionfromDB, downCountPlus, _a, error_9, error_10;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 9, , 10]);
                    id = request.params.id;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 7, , 8]);
                    return [4 /*yield*/, questionSchema_1.questions.findById(id)];
                case 2:
                    questionfromDB = _b.sent();
                    _b.label = 3;
                case 3:
                    _b.trys.push([3, 5, , 6]);
                    downCountPlus = new questionSchema_1.questions();
                    downCountPlus = {
                        question: questionfromDB.question,
                        category: questionfromDB.category,
                        answerId: questionfromDB.answerId,
                        upVoteCount: questionfromDB.upVoteCount,
                        downVoteCount: questionfromDB.downVoteCount + 1,
                        userId: questionfromDB.userId
                    };
                    return [4 /*yield*/, questionSchema_1.questions.findByIdAndUpdate(id, downCountPlus, { new: true })];
                case 4:
                    downCountPlus = _b.sent();
                    return [2 /*return*/, response.status(200).send({ success: true, downCountPlus: downCountPlus })];
                case 5:
                    _a = _b.sent();
                    return [2 /*return*/, response.status(404).send({ success: false, message: "Cannot Update the Down Vote Count" })];
                case 6: return [3 /*break*/, 8];
                case 7:
                    error_9 = _b.sent();
                    return [2 /*return*/, response.status(404).send({ success: false, message: "Cannot find the Question" })];
                case 8: return [3 /*break*/, 10];
                case 9:
                    error_10 = _b.sent();
                    return [2 /*return*/, response.status(404).send({ success: false, message: "Something went wrong Please Try again" })];
                case 10: return [2 /*return*/];
            }
        });
    });
}
exports.downVoteQuestion = downVoteQuestion;

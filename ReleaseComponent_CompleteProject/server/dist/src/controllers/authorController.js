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
exports.getAuthorByName = exports.addNewAuthor = exports.getAuthorById = void 0;
var authorSchema_1 = __importDefault(require("../models/authorSchema"));
var bookSchema_1 = __importDefault(require("../models/bookSchema"));
var getAuthorById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Authors, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, authorSchema_1.default.findById(req.params.id)];
            case 1:
                Authors = _a.sent();
                res.status(200).json(Authors);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                res.status(404).json({ err: err_1.message, success: false });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAuthorById = getAuthorById;
var addNewAuthor = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Authors, aut, book, list, i, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                Authors = new authorSchema_1.default(req.body);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 10, , 11]);
                return [4 /*yield*/, bookSchema_1.default.findOne({ author: req.body.name })];
            case 2:
                aut = _a.sent();
                book = void 0;
                list = req.body.listOfBooks;
                i = 0;
                _a.label = 3;
            case 3:
                if (!(i < list.length)) return [3 /*break*/, 6];
                return [4 /*yield*/, bookSchema_1.default.find({ title: list[i] })];
            case 4:
                book = _a.sent();
                if (book.length !== 0) {
                    return [3 /*break*/, 6];
                }
                _a.label = 5;
            case 5:
                i++;
                return [3 /*break*/, 3];
            case 6:
                if (!(!aut || book.length === 0)) return [3 /*break*/, 7];
                res.status(404).json({
                    message: "Book not found. Please add the book first...",
                    success: false,
                });
                return [3 /*break*/, 9];
            case 7: return [4 /*yield*/, Authors.save().then(function (author) {
                    console.log(author._id);
                })];
            case 8:
                _a.sent();
                res
                    .status(200)
                    .json({ message: "Author is Added Successfully...", success: true });
                _a.label = 9;
            case 9: return [3 /*break*/, 11];
            case 10:
                err_2 = _a.sent();
                res.status(404).json({ err: err_2.message, success: false });
                return [3 /*break*/, 11];
            case 11: return [2 /*return*/];
        }
    });
}); };
exports.addNewAuthor = addNewAuthor;
var getAuthorByName = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var name_1, Authors, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                name_1 = req.params.authorName;
                return [4 /*yield*/, authorSchema_1.default.findOne({ name: name_1 })];
            case 1:
                Authors = _a.sent();
                res.status(200).json(Authors);
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                res.status(404).json({ err: err_3.message, success: false });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAuthorByName = getAuthorByName;

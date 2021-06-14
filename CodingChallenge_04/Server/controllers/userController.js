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
var userSchema_1 = require("../models/userSchema");
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var UserController = /** @class */ (function () {
    function UserController() {
        var _this = this;
        this.userNameInUse = function (username, response) { return __awaiter(_this, void 0, void 0, function () {
            var userWithUserName, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, userSchema_1.users.findOne({ username: username })];
                    case 1:
                        userWithUserName = _a.sent();
                        if (userWithUserName)
                            return [2 /*return*/, userWithUserName];
                        return [2 /*return*/, true];
                    case 2:
                        err_1 = _a.sent();
                        console.log('Error in userNameInUse', err_1.message);
                        response.send(err_1.message);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        //POST register a new User
        this.registerUser = function (request, response) { return __awaiter(_this, void 0, void 0, function () {
            var _a, username_1, name_1, email_1, password_1, phone_1, avatar_1, err_2;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        _a = request.body, username_1 = _a.username, name_1 = _a.name, email_1 = _a.email, password_1 = _a.password, phone_1 = _a.phone, avatar_1 = _a.avatar;
                        return [4 /*yield*/, this.userNameInUse(username_1, response)];
                    case 1:
                        if (!((_b.sent()) === true)) return [3 /*break*/, 3];
                        return [4 /*yield*/, bcrypt_1.default.hash(password_1, 10, function (err, hash) { return __awaiter(_this, void 0, void 0, function () {
                                var newUser, _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            if (err) {
                                                console.log('Error in Hashing the Password', err.message);
                                                return [2 /*return*/, response.status(404).send({ success: false, message: 'Error in Hashing the Password' })];
                                            }
                                            password_1 = hash;
                                            newUser = new userSchema_1.users();
                                            newUser = { username: username_1, name: name_1, email: email_1, password: password_1, phone: phone_1, avatar: avatar_1 };
                                            _b.label = 1;
                                        case 1:
                                            _b.trys.push([1, 3, , 4]);
                                            return [4 /*yield*/, userSchema_1.users.create(newUser)];
                                        case 2:
                                            newUser = _b.sent();
                                            response.status(201).send(newUser);
                                            return [3 /*break*/, 4];
                                        case 3:
                                            _a = _b.sent();
                                            return [2 /*return*/, response.status(409).send({
                                                    success: false,
                                                    message: 'Email in use...Try using other mail Id'
                                                })];
                                        case 4: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        response.status(409).send({
                            success: false,
                            message: 'Username already used....Please Try a new One'
                        });
                        _b.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        err_2 = _b.sent();
                        response.status(409).send({
                            success: false,
                            message: 'Error in Register User'
                        });
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        //POST login a new User
        this.loginUser = function (request, response) { return __awaiter(_this, void 0, void 0, function () {
            var _a, username, password, userFound, match, token, err_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        _a = request.body, username = _a.username, password = _a.password;
                        return [4 /*yield*/, this.userNameInUse(username, response)];
                    case 1:
                        userFound = _b.sent();
                        if (!(userFound !== true)) return [3 /*break*/, 3];
                        return [4 /*yield*/, bcrypt_1.default.compare(password, userFound.password)];
                    case 2:
                        match = _b.sent();
                        if (match) {
                            token = jsonwebtoken_1.default.sign({ userId: userFound._id }, "" + process.env.jwt_key, { expiresIn: '5d' });
                            return [2 /*return*/, response.json({ success: true, message: 'Login Succesfull', userFound: userFound, token: token })];
                        }
                        else {
                            return [2 /*return*/, response.status(401).json({ success: false, message: 'Incorrect Password' })];
                        }
                        return [3 /*break*/, 4];
                    case 3: return [2 /*return*/, response.end(JSON.stringify({ success: false, message: 'User not Found Please Register' }))];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        err_3 = _b.sent();
                        console.log('Error in Login User', err_3);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.isAuthorized = function (request, response, next) { return __awaiter(_this, void 0, void 0, function () {
            var token, decode, requestedUser, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        if (!(request.headers && request.headers.authorization)) return [3 /*break*/, 2];
                        token = request.headers.authorization;
                        decode = jsonwebtoken_1.default.verify(token, "" + process.env.jwt_key);
                        return [4 /*yield*/, userSchema_1.users.findById(decode.userId)];
                    case 1:
                        requestedUser = _a.sent();
                        try {
                            if (!requestedUser) {
                                return [2 /*return*/, response.status(401).json({ success: false, message: 'Unauthorized Access' })];
                            }
                            request.user = requestedUser;
                            next();
                        }
                        catch (error) {
                            if (error.name === 'JsonWebTokenError') {
                                return [2 /*return*/, response.status(401).json({ success: false, message: 'Unauthorized Access' })];
                            }
                            if (error.name === 'TokenExpiredError') {
                                return [2 /*return*/, response.status(403).json({ success: false, message: 'Session Expired Please Try Sign in Again' })];
                            }
                            response.json({ success: false, message: 'Couldnt Sign In Try Again' });
                        }
                        return [3 /*break*/, 3];
                    case 2: return [2 /*return*/, response.json({ success: false, message: 'Token Not Sent' })];
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        console.log('Error in Authorization ', error_1.message);
                        return [2 /*return*/, response.json({ success: false, message: 'Unauthorized Access' })];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.bookMarkMovie = function (request, response) { return __awaiter(_this, void 0, void 0, function () {
            var userID, imdbID, updatedUser, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userID = request.user._id;
                        imdbID = request.params.imdbID;
                        return [4 /*yield*/, userSchema_1.users.findOneAndUpdate({ _id: userID, bookmarks: { $ne: imdbID } }, { $push: { bookmarks: imdbID } }, { new: true })];
                    case 1:
                        updatedUser = _a.sent();
                        if (updatedUser)
                            response.status(200).send({ success: true, message: 'Book Marked Successfully', updatedUser: updatedUser });
                        else
                            return [2 /*return*/, response.status(200).send({ success: false, message: 'Already BookMarked' })];
                        return [3 /*break*/, 3];
                    case 2:
                        err_4 = _a.sent();
                        response.status(404).send({ success: false, message: err_4.message });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
    }
    return UserController;
}());
exports.default = UserController;

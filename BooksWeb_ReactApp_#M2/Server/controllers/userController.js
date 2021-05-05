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
exports.isAuthorized = exports.loginUser = exports.registerUser = void 0;
var userSchema_1 = require("../models/userSchema");
var bcrypt_1 = __importDefault(require("bcrypt"));
var express_1 = require("express");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config();
function emailInUse(email) {
    return __awaiter(this, void 0, void 0, function () {
        var userWithEmail, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, userSchema_1.user.findOne({ email: email })];
                case 1:
                    userWithEmail = _a.sent();
                    if (userWithEmail)
                        return [2 /*return*/, userWithEmail];
                    return [2 /*return*/, true];
                case 2:
                    err_1 = _a.sent();
                    console.log('Error in emailInUse', err_1.message);
                    express_1.response.send(err_1.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// Method : POST to register a new user
function registerUser(request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, name_1, email_1, password_1, err_2;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, , 6]);
                    _a = request.body, name_1 = _a.name, email_1 = _a.email, password_1 = _a.password;
                    return [4 /*yield*/, emailInUse(email_1)];
                case 1:
                    if (!((_b.sent()) === true)) return [3 /*break*/, 3];
                    return [4 /*yield*/, bcrypt_1.default.hash(password_1, 10, function (err, hash) { return __awaiter(_this, void 0, void 0, function () {
                            var newUser;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (err) {
                                            console.log('Error in Hashing the Password', err.message);
                                            return [2 /*return*/, false];
                                        }
                                        password_1 = hash;
                                        newUser = new userSchema_1.user();
                                        newUser = { name: name_1, email: email_1, password: password_1 };
                                        return [4 /*yield*/, userSchema_1.user.create(newUser)];
                                    case 1:
                                        newUser = _a.sent();
                                        response.status(201).send(newUser);
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 2:
                    _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    response.status(409).send({
                        success: false,
                        message: 'This email-id is already in use'
                    });
                    _b.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    err_2 = _b.sent();
                    console.log('Error in Register User', err_2.message);
                    response.status(409).send({
                        success: false,
                        message: 'Error in Register User'
                    });
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.registerUser = registerUser;
function loginUser(request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, email, password, userEmail, match, token, err_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, , 6]);
                    _a = request.body, email = _a.email, password = _a.password;
                    return [4 /*yield*/, emailInUse(email)];
                case 1:
                    userEmail = _b.sent();
                    if (!(userEmail !== true)) return [3 /*break*/, 3];
                    return [4 /*yield*/, bcrypt_1.default.compare(password, userEmail.password)];
                case 2:
                    match = _b.sent();
                    if (match) {
                        token = jsonwebtoken_1.default.sign({ userId: userEmail._id }, "" + process.env.jwt_key, { expiresIn: '1d' });
                        return [2 /*return*/, response.json({ success: true, message: 'Login Succesfull', token: token })];
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
    });
}
exports.loginUser = loginUser;
function isAuthorized(request, response, next) {
    return __awaiter(this, void 0, void 0, function () {
        var token, decode, requestedUser, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    if (!(request.headers && request.headers.authorization)) return [3 /*break*/, 2];
                    token = request.headers.authorization;
                    decode = jsonwebtoken_1.default.verify(token, "" + process.env.jwt_key);
                    return [4 /*yield*/, userSchema_1.user.findById(decode.userId)];
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
                    _a.label = 2;
                case 2: return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.log('Error in Authorization ', error_1.message);
                    return [2 /*return*/, response.json({ success: false, message: 'Unauthorized Access' })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.isAuthorized = isAuthorized;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
var express_1 = __importDefault(require("express"));
var userController_1 = require("../controllers/userController");
var userRouter = express_1.default.Router();
exports.userRouter = userRouter;
userRouter.post('/register', function (request, response) {
    userController_1.registerUser(request, response);
});
userRouter.post('/login', function (request, response) {
    userController_1.loginUser(request, response);
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var userController_1 = __importDefault(require("../controllers/userController"));
var UserRoute = function () {
    var userRouter = express_1.default.Router();
    var userController = new userController_1.default();
    userRouter.post("/register", function (request, response) {
        userController.registerUser(request, response);
    });
    userRouter.post("/login", function (request, response) {
        userController.loginUser(request, response);
    });
    userRouter.patch("/bookmark/imdbID/:imdbID", userController.isAuthorized, function (request, response) {
        userController.bookMarkMovie(request, response);
    });
    return userRouter;
};
exports.default = UserRoute;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorRouter = void 0;
var express_1 = __importDefault(require("express"));
var authorController_1 = require("../controllers/authorController");
var auth_1 = require("../middlewares/auth");
exports.authorRouter = express_1.default.Router();
exports.authorRouter.get("/:id", authorController_1.getAuthorById);
exports.authorRouter.get("/name/:authorName", authorController_1.getAuthorByName);
exports.authorRouter.post("/", auth_1.isAuthenticatedUser, auth_1.authorizeRoles("admin"), authorController_1.addNewAuthor);

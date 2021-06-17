"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRouter = void 0;
var express_1 = __importDefault(require("express"));
var bookController_1 = require("../controllers/bookController");
var auth_1 = require("../middlewares/auth");
exports.bookRouter = express_1.default.Router();
exports.bookRouter.get("/", bookController_1.getBooks);
exports.bookRouter.put("/review", auth_1.isAuthenticatedUser, bookController_1.createbookReview);
exports.bookRouter.get("/review/:bookId", auth_1.isAuthenticatedUser, bookController_1.getBookReviews);
exports.bookRouter.get("/:id", bookController_1.getBookById);
exports.bookRouter.post("/", auth_1.isAuthenticatedUser, auth_1.authorizeRoles("admin"), bookController_1.addNewBook);
//bookRouter.get("/text/:text",getBooksByText);
// bookRouter.get()
exports.bookRouter.get("/by/:author", bookController_1.getBookByAuthor);
exports.bookRouter.get("/text/:text", bookController_1.getBooksByText);
exports.bookRouter.get("/title/:title", bookController_1.getBookByTitle);
exports.bookRouter.get("/rating/:rating", bookController_1.getBookByRating);
exports.bookRouter.get("/price/min/:min/max/:max", bookController_1.getBookByPrice);
exports.bookRouter.get("/tag/:tag", bookController_1.getBookByTags);
exports.bookRouter.delete("/:id", auth_1.isAuthenticatedUser, auth_1.authorizeRoles("admin"), bookController_1.deleteBook);
exports.bookRouter.put("/:id", auth_1.isAuthenticatedUser, auth_1.authorizeRoles("admin"), bookController_1.updateBook);

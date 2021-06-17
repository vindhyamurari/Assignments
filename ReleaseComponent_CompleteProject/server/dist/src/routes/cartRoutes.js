"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartRouter = void 0;
var express_1 = __importDefault(require("express"));
var cartController_1 = require("../controllers/cartController");
var auth_1 = require("../middlewares/auth");
exports.cartRouter = express_1.default.Router();
exports.cartRouter.put("/clear", auth_1.isAuthenticatedUser, cartController_1.clearUserCart);
exports.cartRouter.delete("/:productId", auth_1.isAuthenticatedUser, cartController_1.deleteFromCart);
exports.cartRouter.put("/:productId", auth_1.isAuthenticatedUser, cartController_1.addToCart);
exports.cartRouter.post("/", cartController_1.getUserOrder);

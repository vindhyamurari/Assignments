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
exports.clearUserCart = exports.getUserOrder = exports.deleteFromCart = exports.addToCart = void 0;
var userSchema_1 = __importDefault(require("../models/userSchema"));
var bookSchema_1 = __importDefault(require("../models/bookSchema"));
var ErrorHandler = require("../utils/errorHandler");
var catchAsyncErrors = require("../middlewares/catchAsyncErrors");
var addToCart = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var productId, userId, updatedCart, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                productId = req.params.productId;
                userId = req.user.id;
                return [4 /*yield*/, userSchema_1.default.findOneAndUpdate({ _id: userId, cart: { $ne: productId } }, { $push: { cart: productId } }, { new: true })];
            case 1:
                updatedCart = _a.sent();
                if (updatedCart)
                    res.status(200).send({
                        success: true,
                        message: "Added to cart successfully",
                        updatedCart: updatedCart,
                    });
                else
                    return [2 /*return*/, res.status(200).send({ success: false, message: 'Already Added' })];
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                res.status(404).send({ success: false, messages: err_1.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.addToCart = addToCart;
var deleteFromCart = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var productId, userId, updatedCart, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                productId = req.params.productId;
                userId = req.user.id;
                return [4 /*yield*/, userSchema_1.default.findOneAndUpdate({ _id: userId }, { $pull: { cart: productId } }, { new: true })];
            case 1:
                updatedCart = _a.sent();
                if (updatedCart)
                    res.status(200).send({
                        success: true,
                        message: "Removed from cart successfully",
                        updatedCart: updatedCart,
                    });
                else
                    return [2 /*return*/, res.status(200).send({ success: false, message: 'Already Added' })];
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                res.status(404).send({ success: false, messages: err_2.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteFromCart = deleteFromCart;
var getUserOrder = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, user, products, cartItems, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                userId = req.body.id;
                console.log("userID", userId);
                return [4 /*yield*/, userSchema_1.default.findOne({ _id: userId })];
            case 1:
                user = _a.sent();
                products = user.cart;
                console.log("cart products", products);
                return [4 /*yield*/, bookSchema_1.default.find({ _id: { $in: products } })];
            case 2:
                cartItems = _a.sent();
                console.log(cartItems);
                res.status(200).send(cartItems);
                return [3 /*break*/, 4];
            case 3:
                err_3 = _a.sent();
                res.status(404).json({ err: err_3.message, success: false });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getUserOrder = getUserOrder;
var clearUserCart = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, clearCart, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = req.body.id;
                console.log("userID", userId);
                return [4 /*yield*/, userSchema_1.default.updateOne({ _id: userId }, { $set: { cart: [] } }, { multi: true })];
            case 1:
                clearCart = _a.sent();
                //let user: any = await User.findOne({ _id: userId });
                //let products = user.cart;
                console.log("clearcart products", clearCart);
                //let cartItems = await Book.find({ _id: { $in: products } });
                console.log(clearCart);
                res.status(200).send({ success: true, message: "Cart is emptied." });
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                res.status(404).json({ err: err_4.message, success: false });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.clearUserCart = clearUserCart;
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
exports.getAllUserOrders = exports.deleteOrder = exports.updateOrder = exports.allOrders = exports.myOrders = exports.getSingleOrder = exports.newOrder = void 0;
var ordersSchema_1 = __importDefault(require("../models/ordersSchema"));
var bookSchema_1 = __importDefault(require("../models/bookSchema"));
var ErrorHandler = require('../utils/errorHandler');
var catchAsyncErrors = require('../middlewares/catchAsyncErrors');
// Create a new order   =>  /api/v1/order/new
exports.newOrder = catchAsyncErrors(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, orderItems, totalPrice, paymentInfo, order, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, orderItems = _a.orderItems, totalPrice = _a.totalPrice, paymentInfo = _a.paymentInfo;
                console.log("helooooo aALPHAAAAAAAAAAA", req.user);
                return [4 /*yield*/, ordersSchema_1.default.create({
                        orderItems: orderItems,
                        totalPrice: totalPrice,
                        paymentInfo: paymentInfo,
                        paidAt: Date.now(),
                        user: req.user.id
                    })];
            case 1:
                order = _b.sent();
                console.log("order", order);
                res.status(200).json({
                    success: true,
                    order: order
                });
                return [3 /*break*/, 3];
            case 2:
                err_1 = _b.sent();
                res.status(400).send({ success: false, message: "Order not created" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.getSingleOrder = catchAsyncErrors(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var order;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ordersSchema_1.default.findById(req.params.id).populate('user', 'name email _id')];
            case 1:
                order = _a.sent();
                if (!order) {
                    return [2 /*return*/, next(new ErrorHandler('No Order found with this ID', 404))];
                }
                res.status(200).json({
                    success: true,
                    order: order
                });
                return [2 /*return*/];
        }
    });
}); });
exports.myOrders = catchAsyncErrors(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var orders;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ordersSchema_1.default.find({ user: req.user.id })];
            case 1:
                orders = _a.sent();
                res.status(200).json({
                    success: true,
                    orders: orders
                });
                return [2 /*return*/];
        }
    });
}); });
exports.allOrders = catchAsyncErrors(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var orders, totalAmount;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ordersSchema_1.default.find()];
            case 1:
                orders = _a.sent();
                totalAmount = 0;
                orders.forEach(function (order) {
                    totalAmount += order.totalPrice;
                });
                res.status(200).json({
                    success: true,
                    totalAmount: totalAmount,
                    orders: orders
                });
                return [2 /*return*/];
        }
    });
}); });
exports.updateOrder = catchAsyncErrors(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var order;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ordersSchema_1.default.findById(req.params.id)];
            case 1:
                order = _a.sent();
                if (order.orderStatus === 'Delivered') {
                    return [2 /*return*/, next(new ErrorHandler('You have already delivered this order', 400))];
                }
                order.orderItems.forEach(function (item) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, updateStock(item.product, item.quantity)];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                order.orderStatus = req.body.status,
                    order.deliveredAt = Date.now();
                return [4 /*yield*/, order.save()];
            case 2:
                _a.sent();
                res.status(200).json({
                    success: true,
                });
                return [2 /*return*/];
        }
    });
}); });
function updateStock(id, quantity) {
    return __awaiter(this, void 0, void 0, function () {
        var book;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, bookSchema_1.default.findById(id)];
                case 1:
                    book = _a.sent();
                    book.stock = book.stock - quantity;
                    return [4 /*yield*/, book.save()];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.deleteOrder = catchAsyncErrors(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var order;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ordersSchema_1.default.findById(req.params.id)];
            case 1:
                order = _a.sent();
                if (!order) {
                    return [2 /*return*/, next(new ErrorHandler('No Order found with this ID', 404))];
                }
                return [4 /*yield*/, order.remove()];
            case 2:
                _a.sent();
                res.status(200).json({
                    success: true
                });
                return [2 /*return*/];
        }
    });
}); });
var getAllUserOrders = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var allOrderItems_1, userId, userOrders, _i, userOrders_1, eachOrder, orderItems, books, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                allOrderItems_1 = [];
                userId = req.user.id;
                console.log("userID", userId);
                return [4 /*yield*/, ordersSchema_1.default.find({ user: userId })];
            case 1:
                userOrders = _a.sent();
                for (_i = 0, userOrders_1 = userOrders; _i < userOrders_1.length; _i++) {
                    eachOrder = userOrders_1[_i];
                    orderItems = eachOrder.orderItems;
                    orderItems.forEach(function (element) {
                        allOrderItems_1.push(element);
                    });
                }
                return [4 /*yield*/, bookSchema_1.default.find({ _id: { $in: allOrderItems_1 } })];
            case 2:
                books = _a.sent();
                res.status(200).send(books);
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                res.status(404).json({ err: err_2.message, success: false });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getAllUserOrders = getAllUserOrders;

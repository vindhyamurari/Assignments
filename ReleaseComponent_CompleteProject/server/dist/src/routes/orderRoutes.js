"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
var express_1 = __importDefault(require("express"));
var orderController_1 = require("../controllers/orderController");
var auth_1 = require("../middlewares/auth");
exports.orderRouter = express_1.default.Router();
exports.orderRouter.post("/new", auth_1.isAuthenticatedUser, orderController_1.newOrder);
exports.orderRouter.get("/", auth_1.isAuthenticatedUser, orderController_1.getAllUserOrders);
exports.orderRouter.get("/myOrders", auth_1.isAuthenticatedUser, orderController_1.myOrders);
exports.orderRouter.get('/admin/orders', auth_1.isAuthenticatedUser, auth_1.authorizeRoles('admin'), orderController_1.allOrders);
exports.orderRouter.put('/admin/order/:id', auth_1.isAuthenticatedUser, auth_1.authorizeRoles('admin'), orderController_1.updateOrder);
exports.orderRouter.delete('/admin/order/:id', auth_1.isAuthenticatedUser, auth_1.authorizeRoles('admin'), orderController_1.deleteOrder);
exports.orderRouter.get("/:id", auth_1.isAuthenticatedUser, orderController_1.getSingleOrder);

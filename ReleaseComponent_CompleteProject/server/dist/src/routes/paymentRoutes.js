"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRouter = void 0;
var express_1 = __importDefault(require("express"));
exports.paymentRouter = express_1.default.Router();
var paymentController_1 = require("../controllers/paymentController");
var auth_1 = require("../middlewares/auth");
exports.paymentRouter.post('/payment/process', auth_1.isAuthenticatedUser, paymentController_1.processPayment);
exports.paymentRouter.get('/stripeapi', auth_1.isAuthenticatedUser, paymentController_1.sendStripApi);

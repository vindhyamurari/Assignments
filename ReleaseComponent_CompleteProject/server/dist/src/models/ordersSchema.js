"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var mongoose_1 = __importDefault(require("mongoose"));
var ordersSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "user",
    },
    orderItems: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            required: true,
            ref: "Product",
        }
    ],
    paymentInfo: {
        type: String
    },
    paidAt: {
        type: Date,
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    orderStatus: {
        type: String,
        required: true,
        default: "Processing",
    },
    deliveredAt: {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { collection: "orders" });
module.exports = mongoose_1.default.model("order", ordersSchema);

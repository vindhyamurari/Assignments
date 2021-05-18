"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.otpInfo = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var otpInfoSchema = new mongoose_1.default.Schema({
    phone: {
        type: String,
        required: true
    },
    otp: {
        type: Number,
        required: true
    }
});
var otpInfo = mongoose_1.default.model('otpInfos', otpInfoSchema);
exports.otpInfo = otpInfo;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var mongoose_1 = __importDefault(require("mongoose"));
var validator_1 = __importDefault(require("validator"));
var userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
        maxLength: [30, "your name can't exceed 30 characters"],
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        validate: [validator_1.default.isEmail, "Please enter a valid email address"],
    },
    phoneNumber: {
        type: String,
        required: [true, "Please enter your phone number"],
        length: [13, "Please enter 10 digit mobile number"],
        validate: [validator_1.default.isMobilePhone, "Please enter a valid mobile number"],
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minLength: [6, "Password must be longer than 6 characters"],
        // select: false,
    },
    avatar: {
        public_id: {
            type: String,
            // required: true,
        },
        url: {
            type: String,
            // required: true,
        },
    },
    role: {
        type: String,
        default: "user",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    book: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "books",
        // required: true,
    },
    cart: {
        type: Array
    }
}, { collection: "users", timestamps: true });
module.exports = mongoose_1.default.model("user", userSchema);

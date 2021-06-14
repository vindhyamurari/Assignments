"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var usersSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
    },
    phone: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    bookmarks: {
        type: [String],
        default: []
    }
});
var users = mongoose_1.default.model('users', usersSchema);
exports.users = users;

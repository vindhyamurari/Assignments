"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.model = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var bookSchema = new mongoose_1.default.Schema({
    isbn: {
        type: String,
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String
    },
    price: {
        type: String
    },
    rating: {
        type: String
    },
    pages: {
        type: String
    },
    votes: {
        type: String
    },
    description: {
        type: String
    }
});
var model = mongoose_1.default.model('books', bookSchema);
exports.model = model;

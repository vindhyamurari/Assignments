"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var mongoose_1 = __importDefault(require("mongoose"));
var bookSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: [true, "Please enter Book title"],
        maxLength: [100, "Book title cannot exceed 100 characters"],
    },
    author: {
        type: String,
        required: [true, "Please enter Book Author"],
    },
    authorImage: {
        type: String
    },
    description: {
        type: String,
        default: ''
    },
    price: {
        type: Number,
        required: [true, "Please enter Book price"],
        default: 0.0,
    },
    ratings: {
        type: Number,
        default: 0,
    },
    cover: {
        type: String,
        required: true,
    },
    pages: {
        type: String,
        required: true,
    },
    tags: {
        type: Array,
        required: [true, "Please enter the tags"],
    },
    stock: {
        type: Number,
        required: [true, "Please enter Book stock"],
        maxLength: [5, "Book title cannot exceed 5 characters"],
        default: 0,
    },
    votes: {
        type: Number,
        default: 0,
    },
    discount: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
            user: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "user",
                // required: true,
            },
            name: {
                type: String,
                // required: true,
            },
            rating: {
                type: Number,
                // required: true,
            },
            comment: {
                type: String,
                // required: true,
            },
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { collection: "books", timestamps: true });
module.exports = mongoose_1.default.model("Book", bookSchema);

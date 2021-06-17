"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var mongoose_1 = __importDefault(require("mongoose"));
var authorSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    listOfBooks: {
        type: Array,
        required: true,
    },
    interests: {
        type: Array,
        required: true,
    },
    image: {
        type: String
    }
}, { collection: "authors" });
module.exports = mongoose_1.default.model("author", authorSchema);

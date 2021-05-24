"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.directors = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var directorSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    awardCount: {
        type: Number,
        required: true
    }
});
var directors = mongoose_1.default.model('directors', directorSchema);
exports.directors = directors;

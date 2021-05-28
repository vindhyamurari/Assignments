"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.movies = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var movieSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    movieId: {
        type: Number,
        required: true
    },
    boxOfficeCollection: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    directors: {
        type: Array,
        required: true
    }
});
var movies = mongoose_1.default.model('movies', movieSchema);
exports.movies = movies;

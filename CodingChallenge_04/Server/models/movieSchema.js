"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var movieSchema = new mongoose_1.default.Schema({
    imdbID: {
        type: String,
        required: true
    },
    Title: {
        type: String,
        required: true
    },
    Year: {
        type: String,
        required: true
    },
    Released: {
        type: String
    },
    Runtime: {
        type: String
    },
    Genre: {
        type: String
    },
    Director: {
        type: String
    },
    Writer: {
        type: String
    },
    Actors: {
        type: String
    },
    Language: {
        type: String
    },
    Country: {
        type: String
    },
    imdbRating: {
        type: String
    },
    imdbVotes: {
        type: String
    },
    Poster: {
        type: String
    }
});
var model = mongoose_1.default.model('movies', movieSchema);
exports.default = model;

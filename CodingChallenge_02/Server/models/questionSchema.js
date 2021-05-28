"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.questions = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var questionsSchema = new mongoose_1.default.Schema({
    question: {
        type: String,
        required: true
    },
    userId: {
        type: Object,
        required: true
    },
    category: {
        type: Array,
        required: true
    },
    upVoteCount: {
        count: {
            type: Number,
            default: 0
        },
        likedUsers: {
            type: Array,
            default: []
        }
    },
    downVoteCount: {
        count: {
            type: Number,
            default: 0
        },
        likedUsers: {
            type: Array,
            default: []
        }
    }
});
var questions = mongoose_1.default.model('questions', questionsSchema);
exports.questions = questions;

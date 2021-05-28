"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.answers = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var answersSchema = new mongoose_1.default.Schema({
    answer: {
        type: String,
        required: true
    },
    questionId: {
        type: Object,
        required: true
    },
    userId: {
        type: Object,
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
var answers = mongoose_1.default.model('answers', answersSchema);
exports.answers = answers;

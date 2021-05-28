"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var connection_1 = __importDefault(require("./models/connection"));
var dotenv_1 = __importDefault(require("dotenv"));
var userRoute_1 = require("./routes/userRoute");
var questionRoute_1 = require("./routes/questionRoute");
var answerRoute_1 = require("./routes/answerRoute");
dotenv_1.default.config();
var runServer = function () {
    var app = express_1.default();
    app.use(express_1.default.json());
    app.use(cors_1.default());
    app.use('/api/users', userRoute_1.userRouter);
    app.use('/api/questions', questionRoute_1.questionRouter);
    app.use('/api/answers', answerRoute_1.answerRouter);
    connection_1.default()
        .then(function () {
        console.log("Connected to database");
        var port = 5000;
        app.listen(port, function () {
            console.log("Server Running at http://localhost:" + port);
        });
    })
        .catch(function (err) {
        console.log(err.message);
    });
};
runServer();

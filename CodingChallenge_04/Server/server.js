"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var connection_1 = __importDefault(require("./models/connection"));
var dotenv_1 = __importDefault(require("dotenv"));
var userRoute_1 = __importDefault(require("./routes/userRoute"));
var movieRoutes_1 = __importDefault(require("./routes/movieRoutes"));
var runServer = function () {
    var app = express_1.default();
    dotenv_1.default.config();
    app.use(express_1.default.json());
    app.use(cors_1.default());
    var userRouter = userRoute_1.default();
    var movieRouter = movieRoutes_1.default();
    app.use('/api/users', userRouter);
    app.use('/api/movies', movieRouter);
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

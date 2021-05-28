"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionToDB = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
require('dotenv').config();
function connectionToDB() {
    return new Promise(function (resolve, reject) {
        var url = "mongodb+srv://" + process.env.mongo_user + ":" + process.env.mongo_pwd + "@" + process.env.server_name + "/" + process.env.database_name + "?retryWrites=true&w=majority";
        mongoose_1.default.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true }, function (err) {
            if (!err) {
                resolve("connection done");
            }
            else {
                reject("connection not done");
            }
        });
    });
}
exports.connectionToDB = connectionToDB;

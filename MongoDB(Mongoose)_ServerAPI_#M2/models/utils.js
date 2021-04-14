"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostedData = void 0;
function getPostedData(request) {
    return new Promise(function (resolve, reject) {
        try {
            var body_1 = '';
            request.on('data', function (chunk) {
                body_1 += chunk.toString();
            });
            request.on('end', function () { return resolve(body_1); });
        }
        catch (error) {
            reject(error);
        }
    });
}
exports.getPostedData = getPostedData;

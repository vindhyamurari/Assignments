"use strict";
module.exports = function (func) { return function (req, res, next) {
    return Promise.resolve(func(req, res, next)).catch(next);
}; };

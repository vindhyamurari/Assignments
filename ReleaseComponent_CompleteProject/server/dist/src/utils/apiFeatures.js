"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIFeatures = void 0;
var APIFeatures = /** @class */ (function () {
    function APIFeatures(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }
    APIFeatures.prototype.search = function () {
        var keyword = this.queryStr.keyword
            ? {
                name: {
                    $regex: this.queryStr.keyword,
                    $options: "i",
                },
            }
            : {};
        this.query = this.query.find(__assign({}, keyword));
        return this;
    };
    APIFeatures.prototype.filter = function () {
        var queryCopy = __assign({}, this.queryStr);
        // Removing fields from the query
        var removeFields = ["keyword", "limit", "page"];
        removeFields.forEach(function (el) { return delete queryCopy[el]; });
        // Advance filter for price, ratings etc
        var queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, function (match) { return "$" + match; });
        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    };
    APIFeatures.prototype.pagination = function (resPerPage) {
        var currentPage = Number(this.queryStr.page) || 1;
        var skip = resPerPage * (currentPage - 1);
        this.query = this.query.limit(resPerPage).skip(skip);
        return this;
    };
    return APIFeatures;
}());
exports.APIFeatures = APIFeatures;

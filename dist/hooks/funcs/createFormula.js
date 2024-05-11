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
var createFormula = function (initialState) {
    var store = initialState;
    var callbacks = new Set();
    var getStore = function () { return store; };
    var setStore = function (nextState) {
        store = __assign(__assign({}, store), nextState);
        callbacks.forEach(function (callback) { return callback(); });
    };
    var subscribe = function (callback) {
        callbacks.add(callback);
        return function () {
            callbacks.delete(callback);
        };
    };
    return { getStore: getStore, setStore: setStore, subscribe: subscribe };
};
exports.default = createFormula;

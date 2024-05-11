"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var useGetState = function (form) { return function () {
    var getStore = (0, react_1.useContext)(form).getStore;
    return getStore();
}; };
exports.default = useGetState;

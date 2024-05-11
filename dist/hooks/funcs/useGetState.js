"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const useGetState = (form) => () => {
    const { getStore } = (0, react_1.useContext)(form);
    return getStore();
};
exports.default = useGetState;

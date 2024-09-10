"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const registOnValue = (Form) => (asyncState) => {
    const { setStore } = (0, react_1.useContext)(Form);
    setStore(asyncState);
};
exports.default = registOnValue;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formula = void 0;
var react_1 = require("react");
var useRegister_1 = require("./funcs/useRegister");
var useGetState_1 = require("./funcs/useGetState");
var createFormula_1 = require("./funcs/createFormula");
var formula = function (initialState) {
  var form = (0, react_1.createContext)((0, createFormula_1.default)(initialState));
  var formState = (0, useGetState_1.default)(form);
  var register = (0, useRegister_1.default)(form);
  return { register: register, formState: formState };
};
exports.formula = formula;

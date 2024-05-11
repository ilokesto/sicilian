"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var useRegister = function (form) {
  return function (name) {
    var _a = (0, react_1.useContext)(form),
      getStore = _a.getStore,
      setStore = _a.setStore,
      subscribe = _a.subscribe;
    var selector = function (store) {
      return store[name];
    };
    var value = (0, react_1.useSyncExternalStore)(
      subscribe,
      function () {
        return selector(getStore());
      },
      function () {
        return selector(getStore());
      }
    );
    var onChange = function (e) {
      var _a;
      var value = e.target.value;
      setStore(((_a = {}), (_a[e.target.name] = value), _a));
    };
    return { value: value, onChange: onChange, name: name };
  };
};
exports.default = useRegister;

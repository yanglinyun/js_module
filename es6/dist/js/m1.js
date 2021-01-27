'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.name = undefined;
exports.sayName = sayName;

var _m = require('./m2.js');

var m2 = _interopRequireWildcard(_m);

var _m2 = require('./m3.js');

var _m3 = _interopRequireDefault(_m2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

//分别暴露
var name = exports.name = "m1";
function sayName() {
	console.log(name, m2.name, _m3.default.sayName());
}
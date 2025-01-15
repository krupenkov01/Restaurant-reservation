"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _UserController = _interopRequireDefault(require("../controllers/UserController.js"));

var _UserValidation = require("../validations/UserValidation.js");

var _validate = _interopRequireDefault(require("../middlewares/validate.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post("/", (0, _validate["default"])(_UserValidation.userValidation.userValidation), // Middleware для валидации
_UserController["default"].createUser // Убедитесь, что `createUser` экспортируется правильно
);
router.get('/:id', _UserController["default"].getUserById);
router.get('/', _UserController["default"].getUserByEmail); // Пример: GET /api/users?email=test@example.com

router.put('/:id', _UserController["default"].updateUser);
router["delete"]('/:id', _UserController["default"].deleteUser);
var _default = router;
exports["default"] = _default;
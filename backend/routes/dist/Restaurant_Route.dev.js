"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _RestaurantController = _interopRequireDefault(require("../controllers/RestaurantController.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

// Получить список всех ресторанов
router.get("/", _RestaurantController["default"].getAllRestaurants); // Удалить ресторан по ID

router["delete"]("/:id", _RestaurantController["default"].deleteRestaurant); // Создать новый ресторан

router.post("/", _RestaurantController["default"].createRestaurant);
var _default = router;
exports["default"] = _default;
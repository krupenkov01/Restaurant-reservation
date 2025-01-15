"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _CommentController = _interopRequireDefault(require("../controllers/CommentController.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.get('/restaurant/:restaurantId', _CommentController["default"].getCommentsByRestaurantId);
router.post('/', _CommentController["default"].createComment);
router.get('/', _CommentController["default"].getAllComments); // Новый маршрут для получения всех комментариев

router.get('/:id', _CommentController["default"].getCommentById);
router.put('/:id', _CommentController["default"].updateComment);
router["delete"]('/:id', _CommentController["default"].deleteComment);
var _default = router;
exports["default"] = _default;
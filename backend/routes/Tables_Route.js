import express from "express";
import * as TableController from "../controllers/TableController.js";
import { authenticateJWT } from "../auth/authMiddleware.js"; // Импортируем middleware
/**
 * @swagger
 * tags:
 *   name: Tables
 *   description: API для управления столами
 */
const router = express.Router();

router.get("/", TableController.getAllTables);
router.post("/", authenticateJWT, TableController.createTable);
router.get("/:id", TableController.getTableById);
router.put("/:id", authenticateJWT,  TableController.updateTable);
router.delete("/:id", authenticateJWT, TableController.deleteTable);

export default router;
import express from "express";
import * as TableController from "../controllers/TableController.js";

const router = express.Router();

router.get("/", TableController.getAllTables);
router.post("/", TableController.createTable);
router.get("/:id", TableController.getTableById);
router.put("/:id", TableController.updateTable);
router.delete("/:id", TableController.deleteTable);

export default router;

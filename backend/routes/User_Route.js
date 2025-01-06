import express from "express";

const router = express.Router();


router.get("/");
router.delete("/:id");
router.post("/:id/role");

export default router;
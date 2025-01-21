import express from "express";
import * as BookingController from "../controllers/BookingController.js";
import { authenticateJWT } from "../auth/authMiddleware.js"; // Импортируем middleware

const router = express.Router();

router.post("/", authenticateJWT, BookingController.createBooking);
router.get("/", BookingController.getAllBookings);
router.get("/:id", BookingController.getBookingById);
router.put("/:id", authenticateJWT, BookingController.updateBooking);
router.delete("/:id", authenticateJWT, BookingController.deleteBooking);

export default router;
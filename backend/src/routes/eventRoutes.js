import express from 'express';
import { createEvent, getEvents, updateEvent, deleteEvent, joinEvent, leaveEvent, getEventById } from "../controllers/eventController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import upload from "../middleware/multer.js";

const router = express.Router();

// Protect all routes with authentication middleware
router.use(authMiddleware);

// Create a new event (with file upload)
router.post("/", upload.single("image"), createEvent);

// Get all events
router.get("/", getEvents);

// Get a single event by ID
router.get("/:eventId", getEventById); // Add this route

// Update an event (with file upload)
router.put("/:id", upload.single("image"), updateEvent);

// Delete an event
router.delete("/:id", deleteEvent);

// Join an event
router.post("/:eventId/join", joinEvent);

// Leave an event
router.post("/:eventId/leave", leaveEvent);

export default router;
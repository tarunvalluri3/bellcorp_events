const express = require("express");
const router = express.Router();
const {
  getEvents,
  getEventById,
  createEvent,
} = require("../controllers/eventController");

// public routes
router.get("/", getEvents);
router.get("/:id", getEventById);

// temp create route (for testing / seeding)
router.post("/", createEvent);

module.exports = router;

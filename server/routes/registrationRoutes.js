const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const {
  registerForEvent,
  cancelRegistration,
  getMyRegistrations,
} = require("../controllers/registrationController");

router.post("/", protect, registerForEvent);
router.delete("/:eventId", protect, cancelRegistration);
router.get("/me", protect, getMyRegistrations);

module.exports = router;

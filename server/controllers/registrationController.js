const Registration = require("../models/Registration");
const Event = require("../models/Event");

/* -----------------------
   Register For Event
-----------------------*/
exports.registerForEvent = async (req, res) => {
  try {
    const userId = req.user._id;
    const { eventId } = req.body;

    if (!eventId) {
      return res.status(400).json({ message: "eventId required" });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // capacity check
    if (event.registeredCount >= event.capacity) {
      return res.status(400).json({ message: "Event is full" });
    }

    // duplicate check
    const exists = await Registration.findOne({
      user: userId,
      event: eventId,
    });

    if (exists) {
      return res.status(400).json({ message: "Already registered" });
    }

    // create registration
    const reg = await Registration.create({
      user: userId,
      event: eventId,
    });

    // increment counter
    event.registeredCount += 1;
    await event.save();

    res.status(201).json(reg);

  } catch (err) {
    // unique index fallback protection
    if (err.code === 11000) {
      return res.status(400).json({ message: "Duplicate registration" });
    }

    res.status(500).json({ message: err.message });
  }
};

/* -----------------------
   Cancel Registration
-----------------------*/
exports.cancelRegistration = async (req, res) => {
  try {
    const userId = req.user._id;
    const { eventId } = req.params;

    const reg = await Registration.findOneAndDelete({
      user: userId,
      event: eventId,
    });

    if (!reg) {
      return res.status(404).json({ message: "Registration not found" });
    }

    await Event.findByIdAndUpdate(eventId, {
      $inc: { registeredCount: -1 },
    });

    res.json({ message: "Registration cancelled" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* -----------------------
   My Registrations
-----------------------*/
exports.getMyRegistrations = async (req, res) => {
  try {
    const regs = await Registration.find({ user: req.user._id })
      .populate("event")
      .sort({ createdAt: -1 });

    res.json(regs);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

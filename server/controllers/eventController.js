const Event = require("../models/Event");

/* -----------------------
   Get All Events + Filters
-----------------------*/
exports.getEvents = async (req, res) => {
  try {
    const { search, category, location, page = 1, limit = 10 } = req.query;

    let query = {};

    // text search on name
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    if (category) {
      query.category = category;
    }

    if (location) {
      query.location = location;
    }

    const skip = (page - 1) * limit;

    const events = await Event.find(query)
      .sort({ datetime: 1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Event.countDocuments(query);

    res.json({
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      events,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* -----------------------
   Get Single Event
-----------------------*/
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const availableSeats = event.capacity - event.registeredCount;

    res.json({
      ...event.toObject(),
      availableSeats,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* -----------------------
   Create Event (admin/test)
-----------------------*/
exports.createEvent = async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

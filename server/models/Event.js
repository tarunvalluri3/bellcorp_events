const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    organizer: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
      index: true,
    },
    datetime: {
      type: Date,
      required: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      index: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    registeredCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);

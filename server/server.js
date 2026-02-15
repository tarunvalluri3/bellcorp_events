const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// load env
dotenv.config();

// connect database
connectDB();

// models
const User = require("./models/User");
const Event = require("./models/Event");
const Registration = require("./models/Registration");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

/* -------------------------
   Health Check
--------------------------*/
app.get("/", (req, res) => {
  res.json({ message: "Bellcorp Event API running" });
});

/* -------------------------
   TEST — Create User
--------------------------*/
app.post("/test-user", async (req, res) => {
  try {
    const user = await User.create({
      name: "Test User",
      email: `test${Date.now()}@mail.com`,
      password: "123456",
    });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* -------------------------
   TEST — List Users
--------------------------*/
app.get("/test-users", async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

/* -------------------------
   TEST — Create Event
--------------------------*/
app.post("/test-event", async (req, res) => {
  try {
    const event = await Event.create({
      name: "React Conference",
      organizer: "Bellcorp",
      location: "Hyderabad",
      datetime: new Date(Date.now() + 86400000),
      description: "Frontend engineering event",
      category: "Tech",
      capacity: 100,
    });

    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* -------------------------
   TEST — List Events
--------------------------*/
app.get("/test-events", async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

/* -------------------------
   Global Error Handler
--------------------------*/
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Server error" });
});

/* -------------------------
   Start Server
--------------------------*/
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

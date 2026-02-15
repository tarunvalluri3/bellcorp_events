const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { faker } = require("@faker-js/faker");

const connectDB = require("./config/db");
const Event = require("./models/Event");

dotenv.config();

const categories = ["Tech", "Business", "Music", "Sports", "Education"];
const locations = ["Hyderabad", "Chennai", "Bangalore", "Mumbai", "Delhi"];

const seedEvents = async () => {
  try {
    await connectDB();

    console.log("Deleting old events...");
    await Event.deleteMany();

    const events = [];

    for (let i = 0; i < 25; i++) {
      events.push({
        name: faker.company.catchPhrase(),
        organizer: faker.company.name(),
        location: faker.helpers.arrayElement(locations),
        datetime: faker.date.soon({ days: 60 }),
        description: faker.lorem.paragraph(),
        category: faker.helpers.arrayElement(categories),
        capacity: faker.number.int({ min: 20, max: 200 }),
        registeredCount: faker.number.int({ min: 0, max: 10 }),
      });
    }

    await Event.insertMany(events);

    console.log("✅ Seeded 25 events");
    process.exit();

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedEvents();

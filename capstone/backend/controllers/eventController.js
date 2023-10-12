//import dependencies
const Event = require("../models/eventSchema");
let mongoose = require("mongoose");
require("dotenv").config();

// connect to MongoDB
const uri = process.env.API_KEY;
async function connect() {
  try {
    // connect to appropriate DB or log error if it occurs
    await mongoose.connect(uri, { dbName: "capstone" });
    console.log("Database connected");
  } catch (error) {
    console.log(`Databse connection error: ${error}`);
  }
}
connect();
// Troubleshooting for if connection fails after launch
mongoose.connection.on("error", (err) => {
  logError(err);
  console.log(`Error: ${err}`);
});

// End users and admin can access
// fetches all data from the events database and returns it
exports.getEvents = async function (req, res) {
  try {
    let data = await Event.find({});
    return res.send(data);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ message: `Some error occurred while retrieving data. ${err} ` });
  }
};

// Admins only past this point
// adds a new event to the events database
exports.addEvent = async function (req, res) {
  const newEvent = new Event({
    eventName: req.body.eventName,
    eventImg: req.body.eventImg,
    date: req.body.date,
    time: req.body.time,
    price: req.body.price,
  });
  try {
    await newEvent.save();
    return res.send({ message: "New event added successfully." });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ message: `Failed to add new event. Error: ${err}` });
  }
};

//updates an event in the events database
exports.updateEvent = async function (req, res) {
  let id = req.body.id;
  try {
    await Event.findOneAndUpdate(
      { _id: id },
      {
        eventName: req.body.eventName,
        eventImg: req.body.eventImg,
        date: req.body.date,
        time: req.body.time,
        price: req.body.price,
      }
    );
    return res.send({ message: "Updated task successfully." });
  } catch (err) {
    console.log(`Something went wrong when updating data. Error: ${err}`);
    return res.send({
      message: `Something went wrong when updating data. Error: ${err}`,
    });
  }
};

//deletes an event in the events database
exports.deleteEvent = async function (req, res) {
  let id = req.body.id;
  try {
    await Event.deleteOne({ _id: id });
    console.log("Event removed successfully.");
    return res.send({ message: "Event removed successfully" });
  } catch (err) {
    console.log(`Something went wrong when deleting data. Error: ${err}`);
    return res.send({
      message: `Something went wrong when deleting data. Error: ${err}`,
    });
  }
};

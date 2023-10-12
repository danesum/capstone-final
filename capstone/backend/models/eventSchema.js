const mongoose = require("mongoose");

//Schema defining what our Event objects contain and
//mapping them to the collection in the database
let EventSchema = mongoose.Schema(
  {
    eventName: {
      type: String,
      required: true,
    },
    eventImg: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { collection: "events" }
);

module.exports = mongoose.model("Event", EventSchema);

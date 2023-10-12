const mongoose = require("mongoose");

// Schema defining what our User objects contain and
//mapping them to the collection in the database
let UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    admin: {
      type: Boolean,
      required: true,
    },
  },
  { collection: "users" }
);

module.exports = mongoose.model("User", UserSchema);

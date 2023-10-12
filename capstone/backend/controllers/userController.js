const User = require("../models/userSchema");
let mongoose = require("mongoose");
let jwt = require("jsonwebtoken");
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
mongoose.connection.on("error", (error) => {
  logError(error);
  console.log(`Error: ${error}`);
});

//Verifies a user exists in the users database and returns a JWT signed
//with their credentials and whether or not they're an admin
exports.verifyUser = async function (req, res) {
  const testUsername = req.body.username;
  const testPassword = req.body.password;
  try {
    //look for user in database
    const userData = await User.findOne({
      username: testUsername,
      password: testPassword,
    });
    if (userData) {
      //encode JWT token for response
      let jwtToken = jwt.sign(
        {
          username: userData.username,
          password: userData.password,
          admin: userData.admin,
        },
        "secretKey",
        { expiresIn: "1h" }
      );
      //if successful return JWT
      console.log("JWT generated successfully");
      res.send({ token: jwtToken, admin: userData.admin });
    }
    // it it fails user must not exist/has typed incorrect details
    else
      return res.send({
        message: `User does not exist or your details are incorrect. Please try again.`,
      });
  } catch (err) {
    console.log(`Error fetching users: ${err}`);
    return res.send({ message: `Error fetching users: ${err}` });
  }
};

// adds a new user to the users database. Users are always not admins by default.
exports.addUser = async function (req, res) {
  const newUser = new User({
    username: req.body.username,
    password: req.body.password,
    admin: false,
  });
  try {
    await newUser.save();
    return res.send({
      message: `Welcome ${newUser.username}. Please log in to continue.`,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Failed to add new user" });
  }
};

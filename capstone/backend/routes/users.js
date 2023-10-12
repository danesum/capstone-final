var express = require("express");
var router = express.Router();

const userController = require("../controllers/userController");

//map controllers to routes for logging in and registering users
router.post("/login", userController.verifyUser);
router.post("/register", userController.addUser);

module.exports = router;

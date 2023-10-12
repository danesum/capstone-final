var express = require("express");
var router = express.Router();

const eventController = require("../controllers/eventController");

//map route to controller for getting all public data from the database
router.get("/get", eventController.getEvents);

module.exports = router;

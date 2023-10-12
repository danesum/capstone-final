var express = require("express");
var router = express.Router();

const eventController = require("../controllers/eventController");

//map controllers to routes for admin functions
router.post("/add", eventController.addEvent);
router.put("/update", eventController.updateEvent);
router.delete("/delete", eventController.deleteEvent);

module.exports = router;

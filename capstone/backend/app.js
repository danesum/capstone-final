//import needed dependencies and set port for local testing
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());

//import routers
const userRouter = require("./routes/users");
const eventRouter = require("./routes/events");
const adminRouter = require("./routes/admin");

//import middleware
let { checkJWTToken, checkAdmin } = require("./routes/middleware");

//Set routers and middleware
app.use("/user", userRouter);
app.use("/events", checkJWTToken, eventRouter);
app.use("/admin", checkJWTToken, checkAdmin, adminRouter);

app.listen(port, () => console.log(`"Listening engaged"`));

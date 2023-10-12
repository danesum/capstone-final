let jwt = require("jsonwebtoken");

// middleware for validating our JWT token using the jsonwebtoken
// library, runs on all routes
function checkJWTToken(req, res, next) {
  if (req.headers["authorization"]) {
    const auth = req.headers["authorization"];
    const token = auth.split(" ")[1];
    jwt.verify(token, "secretKey", function (error, data) {
      if (error) {
        return res.send({ message: "Invalid Token" });
      } else {
        req.username = data.username;
        req.password = data.password;
        req.admin = data.admin;
        return next();
      }
    });
  } else {
    console.log("No/invalid JWT Token found.");
    return res
      .send({
        message: "Could not confirm your identity, please log in again.",
      })
      .status(403);
  }
}

// middleware for checking whether or not a user is an Admin,
// runs on the admin only route
function checkAdmin(req, res, next) {
  const auth = req.headers["authorization"];
  const token = auth.split(" ")[1];
  try {
    const decoded = jwt.verify(token, "secretKey");
    console.log(decoded.admin);
    if (decoded.admin) {
      console.log("Successfully verified user as admin.");
      return next();
    } else {
      return res
        .send({
          message:
            "Access denied, please contact another admin if this was done in error.",
        })
        .status(403);
    }
  } catch (error) {
    console.log(error);
    return res
      .send({
        message: "Could not confirm admin priveleges, please try again.",
      })
      .status(401);
  }
}

module.exports = {
  checkJWTToken,
  checkAdmin,
};

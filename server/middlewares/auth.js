const jwt = require("jsonwebtoken");

function getUser(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1]; // Extract the token from the request header

  if (token) {
    try {
      const decodedToken = jwt.verify(
        token,
        "5T1xWOB4psqQFMfSUnyXTrRnOGMAvmCHoEbemsaVeWIfvvd4fJkVN3/6Tz4wo3DDzNgksu+SVKoS4cZv0pWwS2uyDjOtgSDCBYODz+rLfCI="
      ); // Verify and decode the token
      req.user = decodedToken; // Attach the decoded user object to req.user
    } catch (error) {
      // Handle token verification error
      return res.status(401).json({ error: "Invalid token" });
    }
  }

  next(); // Call next to proceed to the next middleware or route handler
}

module.exports = getUser;

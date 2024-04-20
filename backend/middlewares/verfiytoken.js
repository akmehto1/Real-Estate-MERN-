const  errorHandler =require("../utils/errror");
const jwt= require('jsonwebtoken');

    


const verifyToken = (req, res, next) => {
  console.log(req.cookies);
    const token = req.cookies.access_tokens;
    console.log("verifyToken");
    console.log(req.cookies.access_tokens);
    console.log(token); // Ensure cookies are parsed
    if (!token) {
      return next(errorHandler(401, "Unauthorized")); // Use camelCase for consistency
    }
    jwt.verify(token, 'shhhhh', (err, user) => {
      if (err) {
        return next(errorHandler(403, "Forbidden"));
      }
      req.user = user;
      console.log("User");
      next();
    });
  }
  
  module.exports = { verifyToken };
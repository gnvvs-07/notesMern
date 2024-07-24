import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(errorHandler(401, "no token for the user user"));
  }
  // verify the token with jwt
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(401, "UnAuthorized user"));
    }
    req.user = user;
    next(); //going for update the function
  });
};
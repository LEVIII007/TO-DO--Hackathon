// const jwt = require("jsonwebtoken");
import jwt from "jsonwebtoken";
// const { COOKIE_NAME } = require("./constants.js");
import { COOKIE_NAME } from "./constants.js";

export const createToken = (id, email, expiresIn) => {
  const payload = { id, email };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn,
  });
  return token;
};

export const verifyToken = async (req, res, next) => {
  const token = req.signedCookies[COOKIE_NAME];
  if (!token || token.trim() === "") {
    return res.status(401).json({ message: "Token Not Received" });
  }

  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, success) => {
      if (err) {
        reject(err.message);
        return res.status(401).json({ message: "Token Expired" });
      } else {
        resolve();
        res.locals.jwtData = success;
        return next();
      }
    });
  });
};

export default { createToken, verifyToken };
// module.exports = { createToken, verifyToken };

const jwt = require("jsonwebtoken");
const { unauthorizesResponse } = require("../util/responseHandler")

module.exports = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return unauthorizesResponse(res, null);
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return unauthorizesResponse(res, null);
    }
    req.user = user;
    next();
  });
};
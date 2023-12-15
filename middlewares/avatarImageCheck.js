const { HttpError } = require("../helpers");

const avatarImageCheck = (req, res, next) => {
  if (!req.file) {
    next(HttpError(400, "No file attached to the request"));
  }

  next();
};

module.exports = avatarImageCheck;

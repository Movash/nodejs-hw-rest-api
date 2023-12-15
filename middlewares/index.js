const validateBody = require("./validateBody")
const validateFavorite = require("./validateFavorite")
const isValidId = require("./isValidId")
const authenticate = require("./authenticate");
const verifyContactOwner = require("./verifyContactOwner");
const verifyOwner = require("./verifyOwner");
const upload = require("./upload")
const avatarImageCheck = require("./avatarImageCheck");

module.exports = {
  validateBody,
  isValidId,
  validateFavorite,
  authenticate,
  verifyContactOwner,
  verifyOwner,
  upload,
  avatarImageCheck,
};
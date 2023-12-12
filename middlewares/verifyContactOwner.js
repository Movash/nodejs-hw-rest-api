const { Contact } = require("../models/contact");
const { HttpError } = require("../helpers");

const verifyContactOwner = async (req, res, next) => {
  const { id } = req.params;
  const { _id: owner } = req.user;

  const contact = await Contact.findById(id);

  if (
    !contact ||
    !contact.owner ||
    contact.owner.toString() !== owner.toString()
  ) {
    next(HttpError(404, "Contact not found"));
  }

  next();
};

module.exports = verifyContactOwner;

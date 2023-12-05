const { Contact } = require("../models/contact");

const { HttpError, ctrlWrapper } = require("../helpers");

const allContacts = async (req, res) => {
  const allContacts = await Contact.find();
  res.json(allContacts);
};

const oneContact = async (req, res) => {
  const { id } = req.params;
  const oneContact = await Contact.findById(id);
  if (!oneContact) {
    throw HttpError(404, "Not found");
  }
  res.json(oneContact);
};

const newContact = async (req, res) => {
  const { name, email, phone, favorite } = req.body;
  const newContact = await Contact.create({ name, email, phone, favorite });
  res.status(201).json(newContact);
};

const removeContact = async (req, res) => {
  const { id } = req.params;
  const removeContact = await Contact.findByIdAndDelete(id);
  if (!removeContact) {
    throw HttpError(404, "Not found");
  }
  res.json({
    message: "contact deleted",
  });
};

const updatedContact = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, favorite } = req.body;
  const updatedContact = await Contact.findByIdAndUpdate(
    id,
    {
      name,
      email,
      phone,
      favorite,
    },
    { new: true }
  );
  if (!updatedContact) {
    throw HttpError(404, "Not found");
  }
  res.json(updatedContact);
};

const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;
  const updateFavorite = await Contact.findByIdAndUpdate(
    id,
    { favorite },
    { new: true }
  );
  if (!updateFavorite) {
    throw HttpError(404, "Not found");
  }
  res.json(updateFavorite);
};

module.exports = {
  allContacts: ctrlWrapper(allContacts),
  oneContact: ctrlWrapper(oneContact),
  newContact: ctrlWrapper(newContact),
  removeContact: ctrlWrapper(removeContact),
  updatedContact: ctrlWrapper(updatedContact),
  updateFavorite: ctrlWrapper(updateFavorite),
};

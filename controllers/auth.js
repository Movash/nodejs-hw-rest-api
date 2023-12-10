const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const { User } = require("../models/user");

const { HttpError, ctrlWrapper } = require("../helpers");

const {SECRET_KEY} = process.env

const register = async (req, res) => {
  const {email, password} = req.body;
  const user = await User.findOne({email})

  if(user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10)

  const newUser = await User.create({...req.body, password: hashPassword})

  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
    subscription: newUser.subscription,
  });
}

const login = async (req, res) => {
  const { name, email, password, subscription } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password)

  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = ({
    id: user._id
  })

  const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "23h"});
  await User.findByIdAndUpdate(user._id, {token})

  res.json({
    token,
    name,
    email,
    subscription,
  })
}

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json({});
};

const getCurrent = async (req, res) => {
  const { name, email, subscription } = req.user;
  res.json({ name, email, subscription });
}

const updateSubscription = async (req, res) => {
  const { id } = req.params;
  const { subscription } = req.body;
  const updateSubscription = await User.findByIdAndUpdate(
    id,
    { subscription },
    { new: true }
  );
  if (!updateSubscription) {
    throw HttpError(404, "Not found");
  }
  res.json(updateSubscription);
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateSubscription: ctrlWrapper(updateSubscription),
};

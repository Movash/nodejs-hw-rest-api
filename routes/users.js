const express = require("express");

const ctrl = require("../controllers/auth");

const {
  validateBody,
  authenticate,
  isValidId,
  verifyOwner,
  upload,
  avatarImageCheck,
} = require("../middlewares");

const { schemas } = require("../models/user");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.post("/logout", authenticate, ctrl.logout);

router.get("/current", authenticate, ctrl.getCurrent);

router.patch(
  "/:id/subscription",
  authenticate,
  isValidId,
  verifyOwner,
  validateBody(schemas.updateSubscriptionSchema),
  ctrl.updateSubscription
);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  avatarImageCheck, 
  ctrl.updateAvatar
);

module.exports = router;
const express = require("express");

const ctrl = require("../../controllers/contacts");

const {
  validateBody,
  validateFavorite,
  isValidId,
  authenticate,
  verifyContactOwner,
} = require("../../middlewares");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", authenticate, ctrl.allContacts);

router.get("/:id", authenticate, isValidId, verifyContactOwner, ctrl.oneContact);

router.post("/", authenticate, validateBody(schemas.addSchema), ctrl.newContact);

router.delete(
  "/:id",
  authenticate,
  isValidId,
  verifyContactOwner,
  ctrl.removeContact
);

router.put(
  "/:id",
  authenticate,
  isValidId,
  verifyContactOwner,
  validateBody(schemas.addSchema),
  ctrl.updatedContact
);

router.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  verifyContactOwner,
  validateFavorite(schemas.updateFavoriteSchema),
  ctrl.updateFavorite
);

module.exports = router;

const express = require("express");

const ctrl = require("../../controllers/contacts");

const {
  validateBody,
  validateFavorite,
  isValidId,
  authenticate,
} = require("../../middlewares");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", authenticate, ctrl.allContacts);

router.get("/:id", authenticate, isValidId, ctrl.oneContact);

router.post("/", authenticate, validateBody(schemas.addSchema), ctrl.newContact);

router.delete("/:id", authenticate, isValidId, ctrl.removeContact);

router.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updatedContact
);

router.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  validateFavorite(schemas.updateFavoriteSchema),
  ctrl.updateFavorite
);

module.exports = router;

const express = require("express");

const ctrl = require("../../controllers/contacts");

const {
  validateBody,
  validateFavorite,
  isValidId,
} = require("../../middlewares");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", ctrl.allContacts);

router.get("/:id", isValidId, ctrl.oneContact);

router.post("/", validateBody(schemas.addSchema), ctrl.newContact);

router.delete("/:id", isValidId, ctrl.removeContact);

router.put(
  "/:id",
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updatedContact
);

router.patch(
  "/:id/favorite",
  isValidId,
  validateFavorite(schemas.updateFavoriteSchema),
  ctrl.updateFavorite
);

module.exports = router;

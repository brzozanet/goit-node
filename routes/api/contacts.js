const express = require("express");
const joi = require("joi");
const router = express.Router();

const authenticateToken = require("../../middlewares/authenticate");

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../../service/index");

const contactSchemaPOST = joi.object({
  name: joi.string().min(5).required(),
  email: joi.string().email().required(),
  phone: joi.string().min(9).required(),
});

const contactSchemaPATCH = joi.object({
  name: joi.string().min(5),
  email: joi.string().email(),
  phone: joi.string().min(9),
});

const userSchemaFavorite = joi.object({
  favorite: joi.boolean(),
});

router.get("/", authenticateToken, async (request, response, next) => {
  try {
    const contactsList = await listContacts(request.user._id);
    response.json(contactsList);
    console.log("All contacts downloaded successfully");
  } catch (error) {
    console.error("Error reading contacts file: ", error);
    next(error);
  }
});

router.get("/:contactId", async (request, response, next) => {
  try {
    const contactId = request.params.contactId;
    const selectedContact = await getContactById(contactId);

    if (selectedContact) {
      response.json(selectedContact);
      console.log("Selected contact downloaded successfully");
    } else {
      console.log("Contact not found");
      next();
    }
  } catch (error) {
    console.error("Error reading contacts file: ", error);
    next();
  }
});

router.post("/", async (request, response, next) => {
  try {
    const body = request.body;
    const { error } = contactSchemaPOST.validate(body);

    if (error) {
      const validatingErrorMessage = error.details[0].message;
      return response
        .status(400)
        .json({ message: `${validatingErrorMessage}` });
    }

    const addedContact = await addContact(body);
    response.json(addedContact);
    console.log("Contact added successfully");
  } catch (error) {
    console.error("Error during adding contact: ", error);
    next();
  }
});

router.delete("/:contactId", async (request, response, next) => {
  try {
    const contactId = request.params.contactId;
    const contactsList = await listContacts();
    const isContactExist = !!contactsList.find(
      (contact) => contact.id === contactId
    );

    if (isContactExist) {
      await removeContact(contactId);
      response.status(200).json({ message: "contact deleted" });
      console.log("Contact deleted successfully");
    } else {
      console.log("Contact not found");
      next();
    }
  } catch (error) {
    console.error("Error during delete contact: ", error);
    next(error);
  }
});

router.patch("/:contactId", async (request, response, next) => {
  try {
    const body = request.body;
    const { error } = contactSchemaPATCH.validate(body);

    if (error) {
      const validatingErrorMessage = error.details[0].message;
      return response
        .status(400)
        .json({ message: `${validatingErrorMessage}` });
    }

    const contactId = request.params.contactId;
    const updatedContact = await updateContact(contactId, body);
    response.status(200).json(updatedContact);
    console.log("Contact updated successfully");
  } catch (error) {
    console.error("Error during updating contact: ", error);
    next();
  }
});

router.patch("/:contactId/favorite", async (request, response, next) => {
  try {
    const body = request.body;
    const { error } = userSchemaFavorite.validate(body);

    if (error) {
      const validatingErrorMessage = error.details[0].message;
      return response
        .status(400)
        .json({ message: `${validatingErrorMessage}` });
    }

    const contactId = request.params.contactId;
    const updatedStatusContact = await updateStatusContact(contactId, body);
    response.status(200).json(updatedStatusContact);
    console.log("Contact updated successfully");
  } catch (error) {
    console.error("Error during updating contact: ", error);
    next();
  }
});

module.exports = router;

// NOTE: basic validation
// router.post("/", async (request, response, next) => {
//   try {
//     const body = request.body;
//     const addedContact = await addContact(body);

//     if (!body.name || !body.email || !body.phone) {
//       return response
//         .status(400)
//         .json({ message: "missing required field(s)" });
//     } else {
//       return response.json(addedContact);
//     }
//   } catch (error) {
//     console.error("Error during add contact: ", error);
//     next(error);
//   }
// });

// router.put("/:contactId", async (request, response, next) => {
//   try {
//     const body = request.body;
//     const contactId = request.params.contactId;
//     const updatedContact = await updateContact(contactId, body);

//     if (Object.keys(body).length === 0) {
//       return response.status(400).json({ message: "missing fields" });
//     } else {
//       return response
//         .status(200)
//         .json(updatedContact.find((contact) => contact.id === contactId));
//     }
//   } catch (error) {
//     console.error("Error during editing contact: ", error);
//     next(error);
//   }
// });

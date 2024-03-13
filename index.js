const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require("./contacts.js");
const argv = require("yargs").argv;

const invokeAction = async ({ action, id, name, email, phone }) => {
  let contacts, selectedContact, newContact;

  switch (action) {
    case "list":
      contacts = await listContacts();
      console.table(contacts);
      break;

    case "get":
      selectedContact = await getContactById(id);
      console.table(selectedContact);
      break;

    case "add":
      newContact = await addContact(name, email, phone);
      console.table(newContact);
      break;

    case "remove":
      await removeContact(id);
      console.log(`Contact with id ${id} removed`);
      break;

    default:
      console.warn("Unknown action type!");
  }
};

invokeAction(argv);

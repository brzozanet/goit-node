import {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} from "./contacts.js";
import yargs from "yargs";
const argv = yargs.argv;

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
      newContact = await addContact(id, name, email, phone);
      console.table(newContact);
      break;

    case "remove":
      await removeContact(id);
      console.log(`Contact with id ${id} removed`);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

if (argv) {
  invokeAction(argv);
} else {
  console.log("No arguments provided");
}

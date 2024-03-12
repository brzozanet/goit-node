const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require("./contacts.js");
const argv = require("yargs").argv;

// console.log("argv: ", argv);
console.log(process.argv);

const invokeAction = ({ action, id, name, email, phone }) => {
  let contacts, selectedContact, newContact;

  switch (action) {
    case "list":
      contacts = listContacts();
      console.table(contacts);
      break;

    case "get":
      selectedContact = getContactById(id);
      console.table(selectedContact);
      break;

    case "add":
      newContact = addContact(name, email, phone);
      console.table(newContact);
      break;

    case "remove":
      removeContact(id);
      console.log(`Contact with id ${id} removed`);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);

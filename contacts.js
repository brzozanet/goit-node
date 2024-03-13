const fs = require("fs/promises");
const path = require("path");
const nanoid = require("nanoid-esm");

const contactsPath = path.join(__dirname, "db", "contacts.json");

// NOTE: pobiera z bazy danych listę kontaktów
const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    console.log("Contacts downloaded successfully");
    return contacts;
  } catch (error) {
    console.error("Error reading contacts file: ", error);
    throw error;
  }
};

// NOTE: pobiera z bazy danych kontakt o określonym ID
const getContactById = async (contactId) => {
  const data = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(data);
  const selectedContact = contacts.find((contact) => contact.id === contactId);
  console.log(`Contact with id: '${contactId}' downloaded successfully`);
  return selectedContact;
};

// NOTE: dodaje do bazy danych kontakt, dodatkowo generuje losowe ID za pomocą nanoid()
const addContact = async (name, email, phone) => {
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    console.log("New contact written to file successfully");
  } catch (error) {
    console.error("Error writing to file: ", error);
  }
};

// NOTE: usuwa z bazy danych kontakt o określonym ID
const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const contactIndex = contacts.findIndex(
      (contact) => contact.id === contactId
    );
    if (contactIndex !== -1) {
      contacts.splice(contactIndex, 1);
      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
      console.log(`Contact with id: '${contactId}' removed successfully`);
    } else {
      console.log(`Contact with id: '${contactId}' not found`);
    }
  } catch (error) {
    console.error("Error during delete contact: ", error);
  }
};

module.exports = { listContacts, getContactById, addContact, removeContact };

// listContacts();
// getContactById("rsKkOQUi80UsgVPCcLZZW");
// addContact("Paweł Brzozowski", "pawel@brzoza.net", "(48) 502636629");
// removeContact("rsKkOQUi80UsgVPCcLZZW");

import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const contactsPath = path.join(__dirname, "db", "contacts.json");

export const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    // console.table(contacts);
    return contacts;
  } catch (error) {
    console.error("Error reading contacts file: ", error);
    throw error;
  }
};

function getContactById(contactId) {
  // ...twój kod
}

export const addContact = async (name, email, phone) => {
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
    console.table(contacts);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    console.log("Data written to file succesfully.");
  } catch (error) {
    console.error("Error writing to file: ", error);
  }
};

function removeContact(contactId) {
  // ...twój kod
}

// listContacts();
// addContact("Paweł Brzozowski", "pawel@brzoza.net", "(48) 502636629");

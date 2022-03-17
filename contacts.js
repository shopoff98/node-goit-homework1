const fs = require("fs/promises");
const contactsPath = require("./db/contactsPath");
const { v4: uuidv4 } = require("uuid");

async function listContacts() {
  const contacts = await fs.readFile(contactsPath);
  const parseContacts = JSON.parse(contacts);
  return parseContacts;
}

async function getContactsById(id) {
  const contacts = await listContacts();
  const contactById = await contacts.find((item) => item.id === id);
  if (!contactById) {
    return null;
  }
  return contactById;
}

async function removeContact(id) {
  const contacts = await listContacts();
  const index = await contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  const [removeContact] = await contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return removeContact;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const id = uuidv4();
  const newContact = { id, name, email, phone };
  await contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
}

module.exports = {
  listContacts,
  getContactsById,
  removeContact,
  addContact,
};

const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join("./db/contacts.json");

async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    const parsedContacts = JSON.parse(contacts);
    return parsedContacts;
  } catch (error) {
    console.error(error);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const getContactById = contacts.filter(
      ({ id }) => id === Number(contactId)
    );
    return getContactById;
  } catch (error) {
    console.error(error);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const newContactList = contacts.filter(({ id }) => id != contactId);
    await fs.writeFile(contactsPath, JSON.stringify(newContactList), "utf-8");

    return newContactList;
  } catch (error) {
    console.error(error);
  }
}

async function removeContact(contactId) {
  try {
    const contactsList = await listContacts();
    const newContactList = contactsList.filter(
      ({ id }) => Number(contactId) !== id
    );
    await fs.writeFile(contactsPath, JSON.stringify(newContactList), "utf-8");
    return newContactList;
  } catch (error) {
    console.error(error);
  }
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const id = Date.now();
  try {
    const newContact = {
      name,
      email,
      phone,
      id: Date.now(),
    };
    const newContactList = [...contacts, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(newContactList), "utf-8");
    console.log(`Added contact with name ${newContact.name}`);
    return newContactList;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

const contacts = require ('./contacts');

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторить
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
        const contactsList = await contacts.listContacts();
        console.table(contactsList);
      break;

    case "get":
        const getById = await contacts.getContactById(id);
        console.table(getById);
      break;

    case "add":
        const contactAdd = await contacts.addContact(name, email, phone);
        console.table(contactAdd);
      break;

    case "remove":
        const contactRemove = await contacts.removeContact(id);
        console.table(contactRemove);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);


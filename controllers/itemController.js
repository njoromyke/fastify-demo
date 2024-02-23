const { v4: uuidv4 } = require("uuid");
let items = require("../items");

const getItems = (req, reply) => {
  reply.send(items);
};

const getItem = (req, reply) => {
  const id = req.params.id;
  const item = items.find((item) => item.id === parseInt(id));

  if (!item) {
    reply.code(404);
    return { message: "Item not found" };
  }

  reply.send(item);
};

const addItem = (req, reply) => {
  const { name } = req.body;
  const id = uuidv4();
  const item = {
    id,
    name,
  };

  items.push(item);
  reply.code(201).send(item);
};

const deleteItem = (req, reply) => {
  const id = req.params.id;
  items = items.filter((item) => item.id !== parseInt(id));
  reply.send({ message: `Item ${id} has been removed` });
};

const updateItem = (req, reply) => {
  const id = req.params.id;
  const { name } = req.body;
  let item = items.find((item) => item.id === parseInt(id));

  if (!item) {
    reply.code(404);
    return { message: "Item not found" };
  }

  item = { ...item, name };
  items = items.map((i) => (i.id === parseInt(id) ? item : i));

  reply.send(item);
};

module.exports = {
  getItems,
  getItem,
  addItem,
  deleteItem,
  updateItem,
};

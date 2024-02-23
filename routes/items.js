const { getItem, getItems, addItem, deleteItem, updateItem } = require("../controllers/itemController");

//Item schema
const Item = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
  },
};

//options for get all items

const getItemsOptions = {
  schema: {
    response: {
      200: {
        type: "array",
        items: Item,
      },
    },
  },
  handler: getItems,
};

const getItemOps = {
  schema: {
    response: {
      200: Item,
    },
  },
  handler: getItem,
};

const updateItemOps = {
  schema: {
    body: {
      type: "object",
      required: ["name"],
      properties: {
        name: { type: "string" },
      },
    },
    response: {
      200: Item,
    },
  },
  handler: updateItem,
};

const postItemOps = {
  schema: {
    body: {
      type: "object",
      required: ["name"],
      properties: {
        name: { type: "string" },
      },
    },
    response: {
      201: Item,
    },
  },
  handler: addItem,
};

const deleteItemOps = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
    },
  },
  handler: deleteItem,
};

function itemRoutes(fastify, options, done) {
  // Get all items
  fastify.get("/items", getItemsOptions);

  // Get single item
  fastify.get("/items/:id", getItemOps);

  // Post single item
  fastify.post("/items", postItemOps);

  //delete single item
  fastify.delete("/items/:id", deleteItemOps);

  fastify.put("/items/:id", updateItemOps);

  done();
}

module.exports = itemRoutes;

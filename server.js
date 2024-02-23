const fastify = require("fastify")({
  logger: true,
});
fastify.register(require("@fastify/swagger"), {
  swagger: {
    info: { title: "fastify-api" },
  },
});
fastify.register(require("@fastify/swagger-ui"), {
  routePrefix: "/docs",
  uiConfig: {
    docExpansion: "list",
    deepLinking: false,
  },
  exposeRoute: true,
});

fastify.register(require("./routes/items"));

const PORT = 5050;

const start = async () => {
  try {
    await fastify.listen({
      port: PORT,
    });
  } catch (error) {
    fastify.log.error(error);

    process.exit(1);
  }
};

start();

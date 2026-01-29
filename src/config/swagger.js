const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "TODO CRUD API",
      version: "1.0.0",
      description: "A simple CRUD API for managing todos",
    },
    servers: [{ url: "http://localhost:3000" }],
  },
  apis: ["./src/routes/*.js"],
};

module.exports = swaggerJsdoc(options);

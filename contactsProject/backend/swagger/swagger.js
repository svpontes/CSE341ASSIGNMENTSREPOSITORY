const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Friends API",
      version: "1.0.0",
      description: "API para gerenciar lista de friends",
    },
    servers: [
      {
        url: "http://localhost:8080",
        description: "Local server",
      },
      {
        url: "https://cse341assignmentsrepository.onrender.com/",
        description: "Production server",
      }
    ],
  },
  apis: ["./backend/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

function swaggerDocs(app) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("📘 Swagger Docs available at /api-docs");
}

module.exports = swaggerDocs;

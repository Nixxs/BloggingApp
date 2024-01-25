const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Blog API',
    version: '1.0.0',
    description: 'An example Blog API for learning Swagger',
  },
  servers: [
    {
      url: 'http://localhost:3000',
    },
  ],
  tags: [
    {
      name: 'Blog',
      description: 'API for blog posts',
    },
  ],
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
}

const options = {
  definition: swaggerDocument,
  // Paths to files containing OpenAPI definitions
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

exports.default = swaggerSpec;
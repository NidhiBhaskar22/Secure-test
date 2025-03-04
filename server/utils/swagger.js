import swaggerJSDoc from 'swagger-jsdoc';
 
const swaggerOptions = {
  definition: {
    openapi: '3.0.0', // OpenAPI version
    info: {
      title: 'SecureTest',
      version: '1.0.0',
      description: 'API documentation for SecureTest',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Base URL of your API
      },
    ],
  },
  apis: ['./Routes/*.js'], // Path to your route files containing Swagger comments
};
 
const swaggerDocs = swaggerJSDoc(swaggerOptions);
export default swaggerDocs;
 
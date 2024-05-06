import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    version: 'v0.0.1',
    title: 'Shoep',
    description: 'A eCommerce for shoes.'
  },
  servers: [
    {
      url: 'http://localhost:3030',
      description: ''
    }
  ],
  components: {
    securitySchemes: {}
  }
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./src/Routes/routes.ts'];

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc);

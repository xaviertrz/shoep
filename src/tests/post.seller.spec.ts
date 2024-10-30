import request from 'supertest';
import { Server } from '../server';
import { HttpResponseCodes } from '../shared/HttpResponseCodes';
const PORT = process.env.PORT || '8080';
const server = new Server(PORT);

beforeEach(async () => {
  await server.listen();
}); // Inicia el servidor antes de cada prueba

afterEach(async () => {
  await server.stop();
}); // Detiene el servidor después de cada prueba

it.only('POST /v1/users/seller', async () => {
  const response = await request(server.express)
    .post('/v1/users/seller') // Envía una petición POST a la ruta '/v1/users/seller'
    .send({
      name: 'Jonnathan', // Nombre del vendedor a registrar
      lastname: 'Ramos', // Apellido del vendedor a registrar
      email: 'jramos9@udi.edu.co', // Email del vendedor a registrar
      phone_number: 3202712218, // Telefono del vendedor a registrar
      nit: 8902127361, // Nit del vendedor a registrar
      password: 'JonnathanRamos1!' // Contraseña del vendedor a registrar
    });
  expect(response.statusCode).toBe(HttpResponseCodes.CREATED); // Verifica que el código de respuesta sea 201
});

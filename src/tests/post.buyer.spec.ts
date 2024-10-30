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

it('POST /v1/users/buyer', async () => {
  const response = await request(server.express)
    .post('/v1/users/buyer') // Envía una petición POST a la ruta '/v1/users/v'
    .send({
      name: 'Jonnathan', // Nombre del comprador a registrar
      lastname: 'Ramos', // Apellido del comprador a registrar
      email: 'jramos1@udi.edu.co', // Email del comprador a registrar
      phone_number: 3202716718, // Telefono del comprador a registrar
      password: 'JonnathanRamos1!' // Contraseña del comprador a registrar
    });
  expect(response.statusCode).toBe(HttpResponseCodes.CREATED);
});

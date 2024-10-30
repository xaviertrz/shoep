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

it.only('POST /v1/users/admin', async () => {
  const response = await request(server.express)
    .post('/v1/users/admin') // Envía una petición POST a la ruta '/v1/users/admin'
    .send({
      name: 'Deyneer', // Nombre del nuevo administrador
      lastname: 'Tarazona', // Apellido del nuevo administrador
      email: 'dtarazona2@udi.edu.co', // Correo electrónico del nuevo administrador
      phone_number: 3207121218, // Número de teléfono del nuevo administrador
      key: 'Shoep2024UdiPg', // Clave o código secreto necesario para la creación de una cuenta de administrador
      password: 'JonnathanRamos11!' // Contraseña de la cuenta de administrador
    });
  expect(response.statusCode).toBe(HttpResponseCodes.CREATED); // Verifica que el código de respuesta sea 201 (CREATED)
});

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

it.only('POST /v1/user-addresses', async () => {
  const response = await request(server.express)
    .post(`/v1/user-addresses`) // Envía una petición POST a la ruta '/v1/user-addresses' para registrar una dirección de usuario
    .set(
      'x-token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX3V1aWQiOiIyMWY3NTJmNy01Nzk1LTRjOTQtYTE4Mi1jZjlmYjliMGU2NjEiLCJyb2xlX2lkIjoxLCJpYXQiOjE3MTcyNzUzMjEsImV4cCI6MTcxNzI3ODkyMX0.SWuqbslSwydVnYYyaO2ueIgbLB8kZRzGFxLCN0FI7KE'
    ) // Configura el encabezado HTTP con el token JWT de autenticación del usuario
    .send({
      neighborhood_id: 52, // ID del vecindario donde se ubica la dirección
      user_uuid: 'ec862eb6-4d02-4ad6-8ea2-51adda25a8a4', // UUID único del usuario al que pertenece la dirección
      phone_number: 6198718, // Número de teléfono asociado a la dirección
      address_line1: 'Rua 1', // Primera línea de la dirección (nombre de la calle)
      address_line2: 'Casa 1' // Segunda línea de la dirección (detalles adicionales como el número de casa)
    });
  console.log(response.body); // Muestra el cuerpo de la respuesta en la consola para depuración
  expect(response.statusCode).toBe(HttpResponseCodes.CREATED); // Verifica que el código de respuesta sea 201
});

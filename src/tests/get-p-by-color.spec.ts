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

it.only('GET /v1/products/by-color/:colorId', async () => {
  const response = await request(server.express).get(`/v1/products/by-color/${1}`); // Envía una petición GET a la ruta '/v1/products/by-color/1' para obtener productos según su color (colorId = 1)

  expect(response.statusCode).toBe(HttpResponseCodes.OK); // Verifica que el código de respuesta sea 200 (OK), lo que indica que la solicitud fue exitosa
});

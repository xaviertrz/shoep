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

it.only('PATCH /v1/products/block/:productUuid', async () => {
  const response = await request(server.express)
    .patch(`/v1/products/block/b0f16599-fad3-4c78-9c79-772a554a59de`) // Envía una petición PATCH a la ruta '/v1/products/block/:productUuid' para bloquear un producto (productUuid específico)
    .set(
      'x-token', // Configura el encabezado HTTP con el token de autenticación del usuario
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX3V1aWQiOiI5NDc5MzQ5Zi0xNDhkLTQwYWQtOGZjMS05Mjk0ZDdhODhmMDUiLCJyb2xlX2lkIjozLCJpYXQiOjE3MTcyNzI2MzcsImV4cCI6MTcxNzI3NjIzN30.vW7pZrm7SR6ogL23wxPquitG12ghcGTeLl4gRFDoW4o'
      // Token JWT utilizado para la autenticación, contiene información del usuario y su rol
    );
  console.log(response.body); // Muestra el cuerpo de la respuesta en la consola para depuración
  expect(response.statusCode).toBe(HttpResponseCodes.OK); // Verifica que el código de respuesta sea 200 (OK), lo que indica que la solicitud fue exitosa
});

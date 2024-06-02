import request from 'supertest';
import { Server } from '../server';
import { HttpResponseCodes } from '../shared/HttpResponseCodes';
const PORT = process.env.PORT || '8080';
const server = new Server(PORT);

beforeEach(async () => {
  await server.listen();
});

afterEach(async () => {
  await server.stop();
});

it.only('GET /v1/products/by-material/:materialId', async () => {
  const response = await request(server.express).get(`/v1/products/by-material/${1}`);
  expect(response.statusCode).toBe(HttpResponseCodes.OK);
});

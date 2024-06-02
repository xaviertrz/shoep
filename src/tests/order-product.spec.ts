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

it.only('PATCH /v1/payments', async () => {
  const response = await request(server.express)
    .post(`/v1/payments`)
    .set(
      'x-token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX3V1aWQiOiI5NDc5MzQ5Zi0xNDhkLTQwYWQtOGZjMS05Mjk0ZDdhODhmMDUiLCJyb2xlX2lkIjozLCJpYXQiOjE3MTcyNzI2MzcsImV4cCI6MTcxNzI3NjIzN30.vW7pZrm7SR6ogL23wxPquitG12ghcGTeLl4gRFDoW4o'
    );
  console.log(response.body);
  expect(response.statusCode).toBe(HttpResponseCodes.OK);
});

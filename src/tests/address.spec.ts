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

it.only('POST /v1/user-addresses', async () => {
  const response = await request(server.express).post(`/v1/user-addresses`).set("x-token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX3V1aWQiOiIyMWY3NTJmNy01Nzk1LTRjOTQtYTE4Mi1jZjlmYjliMGU2NjEiLCJyb2xlX2lkIjoxLCJpYXQiOjE3MTcyNzUzMjEsImV4cCI6MTcxNzI3ODkyMX0.SWuqbslSwydVnYYyaO2ueIgbLB8kZRzGFxLCN0FI7KE").
  send({
    neighborhood_id: 52,
    user_uuid: 'ec862eb6-4d02-4ad6-8ea2-51adda25a8a4',
    phone_number: 6198718,
    address_line1: 'Rua 1',
    address_line2: 'Casa 1'
  });
  console.log(response.body);
  expect(response.statusCode).toBe(HttpResponseCodes.CREATED);
});

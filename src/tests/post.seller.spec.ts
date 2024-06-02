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

it.only('POST /v1/users/buyer', async () => {
  const response = await request(server.express)
    .post('/v1/users/seller')
    .send({
      name: 'Jonnathan',
      lastname: 'Ramos',
      email: 'jramos9@udi.edu.co',
      phone_number: 3202712218,
      nit: 8902127361,
      password: 'JonnathanRamos1!'
    });
  expect(response.statusCode).toBe(HttpResponseCodes.CREATED);
});

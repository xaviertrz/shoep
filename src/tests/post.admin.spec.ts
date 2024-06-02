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

it.only('POST /v1/users/admin', async () => {
  const response = await request(server.express)
    .post('/v1/users/admin')
    .send({
      name: 'Deyneer',
      lastname: 'Tarazona',
      email: 'dtarazona2@udi.edu.co',
      phone_number: 3207121218,
      key: "Shoep2024UdiPg",
      password: 'JonnathanRamos11!'
    });
  expect(response.statusCode).toBe(HttpResponseCodes.CREATED);
});

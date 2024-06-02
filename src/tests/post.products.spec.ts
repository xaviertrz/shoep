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

it.only('POST /v1/products', async () => {
  const response = await request(server.express)
    .post('/v1/products')
    .send({
      category_id: "1",
      seller_uuid: "77f46826-f452-4b1e-b624-9ae98fd1789e",
      name: "Zapatilla para dama muy cómoda",
      brand: "Nike",
      description: "Zapatilla para dama muy cómoda",
      size_id: 1,
      material_id: 1,
      color_id: 1,
      variant: {
        upc: "1234567890",
        sku: "1234567890",
        stock: 5,
        price: 100000,
      }
    });
  expect(response.statusCode).toBe(HttpResponseCodes.CREATED);
});

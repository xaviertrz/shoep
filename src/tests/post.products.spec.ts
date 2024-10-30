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
    .post('/v1/products') // Envía una petición POST a la ruta '/v1/products'
    .send({
      category_id: '1', // ID de la categoría a la que pertenece el producto
      seller_uuid: '77f46826-f452-4b1e-b624-9ae98fd1789e', // UUID único del vendedor
      name: 'Zapatilla para dama muy cómoda', // Nombre del producto
      brand: 'Nike', // Marca del producto
      description: 'Zapatilla para dama muy cómoda', // Descripción detallada del producto
      size_id: 1, // ID que indica el tamaño del producto
      material_id: 1, // ID que indica el material del producto
      color_id: 1, // ID que indica el color del producto
      variant: {
        upc: '1234567890', // Código universal del producto
        sku: '1234567890', // Código de identificación único para control de inventario
        stock: 5, // Cantidad disponible del producto en stock
        price: 100000 // Precio del producto en pesos colombianos
      }
    });
  expect(response.statusCode).toBe(HttpResponseCodes.CREATED); // Verifica que el código de respuesta sea 201 (CREATED)
});

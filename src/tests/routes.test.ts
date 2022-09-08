import request from 'supertest';
import { app } from '../index';

describe('Product API', () => {
  it('should create a product', async () => {
    const product = {
      sku: 'FAL-1100000',
      name: 'Bicicleta Baltoro Aro 29',
      brand: 'Jeep',
      price: 45990.0,
      imageUrl: 'https://falabella.scene7.com/is/image/Falabella/881952249_1?wid=800&hei=800&qlt=70',
      size: '',
    };
    const res = await request(app).post('/api/store/products').send(product);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('msg');
  });

  it('should show all products', async () => {
    const res = await request(app).get('/api/store/products');
    const isArray = Array.isArray(res.body);
    expect(res.statusCode).toEqual(200);
    expect(isArray).toBe(true);
  });

  it('should show a product by its sku', async () => {
    const res = await request(app).get('/api/store/products/' + 'FAL-1100000');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('name');
  });

  it('should update a product by its sku', async () => {
    const product = {
      sku: 'FAL-1100000',
      name: 'Bicicleta Baltoro Aro 26',
      brand: 'Trek',
      price: 4115990.0,
      imageUrl: 'https://falabella.scene7.com/is/image/Falabella/881952249_1?wid=800&hei=800&qlt=70',
      size: '26',
    };
    const res = await request(app)
      .put('/api/store/products/' + 'FAL-1100000')
      .send(product);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('sku');
  });

  it('should delete a product by its sku', async () => {
    const res = await request(app).delete('/api/store/products/' + 'FAL-1100000');
    expect(res.statusCode).toEqual(204);
  });
});

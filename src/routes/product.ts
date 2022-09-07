import { Router } from 'express';
import {
  createProduct,
  deleteProductBySku,
  getAllProducts,
  getProductBySku,
  updateProductBySku,
} from '../controllers/product/product.controller';

const route = Router();

route.post('/products', createProduct);
route.get('/products', getAllProducts);
route.get('/products/:sku', getProductBySku);
route.put('/products/:sku', updateProductBySku);
route.delete('/products/:sku', deleteProductBySku);

export default route;

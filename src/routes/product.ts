import { Router } from 'express';
import { createProduct } from '../controllers/product.controller';

const route = Router();

route.post('/products', createProduct);

export default route;

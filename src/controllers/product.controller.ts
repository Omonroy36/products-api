import { Request, Response } from 'express';
import { getErrorMessage } from '../utils/errors';
import { ProductType } from '../utils/types';
import Product from '../models/product';
import { productSchema } from '../utils/schemas';

export async function createProduct(req: Request, res: Response) {
  try {
    const product: ProductType = await productSchema.validateAsync(req.body);
    console.log(product);
    //Check for existing product by sku
    const foundProduct = await Product.findOne({
      where: {
        sku: product.sku,
      },
    });
    if (foundProduct)
      res.status(400).json({
        msg: 'product with this sku already exists',
      });
    //Create product
    const newProduct = await Product.create(product);
    if (newProduct)
      res.status(200).json({
        msg: 'product created successfully',
      });
    else {
      res.status(400).json({
        msg: 'a problem occurred while creating product',
      });
    }
  } catch (error) {
    res.status(500).json({
      error: getErrorMessage(error),
    });
  }
}

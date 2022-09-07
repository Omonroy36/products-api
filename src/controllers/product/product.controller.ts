import { Request, Response } from 'express';
import { getErrorMessage } from '../../utils/errors';
import { ProductType } from '../../utils/types';
import { findBySku, create, getAll, createProductImages } from './dataAccess';
import { productSchema } from '../../models/product/schema';

export async function createProduct(req: Request, res: Response) {
  try {
    const product: ProductType = await productSchema.validateAsync(req.body);
    const newProduct = await create(product);
    if (newProduct) {
      res.status(200).json({
        msg: 'product created successfully',
      });
    } else {
      res.status(400).json({
        msg: 'a problem occurred while creating product',
      });
    }
  } catch (error) {
    res.status(400).json({
      error: getErrorMessage(error),
    });
  }
}

export async function getProductBySku(req: Request<{ sku: string }>, res: Response) {
  try {
    const sku: string = req.params.sku;
    const foundProduct = await findBySku(sku);
    if (foundProduct) res.status(200).json(foundProduct);
    else
      res.status(404).json({
        msg: 'product not found',
      });
  } catch (error) {
    res.status(400).json({
      error: getErrorMessage(error),
    });
  }
}

export async function getAllProducts(req: Request, res: Response) {
  try {
    const products = await getAll();
    if (products) {
      res.status(200).json(products);
    } else {
      res.status(404).json({
        msg: 'products not found',
      });
    }
  } catch (error) {
    res.status(400).json({
      error: getErrorMessage(error),
    });
  }
}

export async function updateProductBySku(req: Request<{ sku: string }>, res: Response) {
  try {
    const sku: string = req.params.sku;
    const { otherImages, ...product }: ProductType = await productSchema.validateAsync(req.body);
    const foundProduct = await findBySku(sku);

    if (foundProduct) {
      if (otherImages) {
        await createProductImages(otherImages, foundProduct.id);
      }
      await foundProduct.update({ id: foundProduct.id, ...product });
      res.status(200).json(foundProduct);
    } else {
      res.status(404).json({
        msg: 'product not found',
      });
    }
  } catch (error) {
    res.status(400).json({
      error: getErrorMessage(error),
    });
  }
}

export async function deleteProductBySku(req: Request<{ sku: string }>, res: Response) {
  try {
    const sku: string = req.params.sku;
    const foundProduct = await findBySku(sku);
    if (foundProduct) {
      foundProduct.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({
        msg: 'product not found',
      });
    }
  } catch (error) {
    res.status(400).json({
      error: getErrorMessage(error),
    });
  }
}

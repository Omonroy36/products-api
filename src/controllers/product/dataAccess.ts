import Product from '../../models/product/product';
import Image from '../../models/image/image';
import { ProductType } from '../../utils/types';

export async function findBySku(sku: string) {
  return Product.findOne({
    where: {
      sku,
    },
    include: {
      model: Image,
      as: 'otherImages',
      attributes: ['imageUrl'],
    },
    attributes: ['sku', 'name', 'brand', 'size', 'price', 'imageUrl', 'id'],
  }).then((product) => product);
}

export async function create(product: ProductType) {
  return Product.create(product).then((newProduct) => {
    if (product.otherImages && product.otherImages.length > 0) {
      for (const image of product.otherImages) {
        Image.create({ imageUrl: image, productId: newProduct.id });
      }
    }
    return newProduct;
  });
}

export async function getAll() {
  return Product.findAll({
    include: {
      model: Image,
      as: 'otherImages',
      attributes: ['imageUrl'],
    },
    attributes: ['sku', 'name', 'brand', 'size', 'price', 'imageUrl'],
  }).then((products) => products);
}

export async function createProductImages(images: string[], productId: number) {
  for (const image of images) {
    await Image.create({ imageUrl: image, productId: productId });
  }
}

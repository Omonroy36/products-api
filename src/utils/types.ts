export interface ProductType {
  id?: number;
  sku: string;
  name: string;
  price: number;
  size?: string;
  brand: string;
  imageUrl: string;
  otherImages?: string[];
}

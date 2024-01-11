export interface IProduct {
  product_name: string;
  product_image: string;
  // product_image: string | Express.Multer.File;
  description: string;
  price: number;
  stock: number;
}

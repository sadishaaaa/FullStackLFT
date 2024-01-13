export interface IOrder {
  id: number;
  userId: number;
  firstName: string;
  lastName: string;
  orderDate: Date;
  productName: string;
  productImage: string;
  price: number;
  paymentStatus: boolean;
}

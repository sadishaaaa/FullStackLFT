export interface IOrder {
  shipping_address: string;
  billing_address: string;
  payment_status: boolean;
  user_id: number;
  mode_of_payment: string;
  subtotal: number;
}

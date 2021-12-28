import { CartProduct } from './cart-product.interface';

export interface CartCheckoutResponse {
  total_amount: number;
  total_amount_with_discount: number;
  total_discount: number;
  products: Array<CartProduct>;
}

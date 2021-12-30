import { ApiProperty } from '@nestjs/swagger';
import { CartProduct, CartProductDoc } from './cart-product.interface';

export interface CartCheckoutResponse {
  total_amount: number;
  total_amount_with_discount: number;
  total_discount: number;
  products: Array<CartProduct>;
}

export class CartCheckout implements CartCheckoutResponse {
  @ApiProperty({
    description: 'Valor total.',
  })
  total_amount: number;
  @ApiProperty({
    description: 'Valor total com descontos.',
  })
  total_amount_with_discount: number;
  @ApiProperty({
    description: 'Valor total de descontos.',
  })
  total_discount: number;
  @ApiProperty({
    description: 'Lista de produtos.',
    isArray: true,
    type: CartProductDoc,
  })
  products: CartProduct[];
}

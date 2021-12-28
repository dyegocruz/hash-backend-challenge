import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { CartProductCheckout } from './cart-product-checkout.dto';

export class CartCheckout {
  @IsArray({ message: 'O elemento products deve ser do tipo Array' })
  @IsNotEmpty({
    message: 'Favor informar o elemento products no corpo da requisição',
  })
  @ValidateNested({ each: true })
  @Type(() => CartProductCheckout)
  products: Array<CartProductCheckout>;
}

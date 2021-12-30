import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { CartProductCheckout } from './cart-product-checkout.dto';

export class CartCheckoutDto {
  @ApiProperty({
    required: true,
    description: 'Lista de produtos com suas respectivas quantidades.',
    isArray: true,
    type: CartProductCheckout,
  })
  @IsArray({ message: 'O elemento products deve ser do tipo Array' })
  @IsNotEmpty({
    message: 'Favor informar o elemento products no corpo da requisição',
  })
  @ValidateNested({ each: true })
  @Type(() => CartProductCheckout)
  products: Array<CartProductCheckout>;
}

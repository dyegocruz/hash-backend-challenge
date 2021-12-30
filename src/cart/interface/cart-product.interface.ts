import { ApiProperty } from '@nestjs/swagger';

export interface CartProduct {
  id: number;
  quantity: number;
  unit_amount: number;
  total_amount: number;
  discount: number;
  is_gift: boolean;
}

export class CartProductDoc implements CartProduct {
  @ApiProperty({
    description: 'Id do produto.',
  })
  id: number;
  @ApiProperty({
    description: 'Quantidade do produto.',
  })
  quantity: number;
  @ApiProperty({
    description: 'Valor unitário do produto.',
  })
  unit_amount: number;
  @ApiProperty({
    description: 'Valor total do produto no carrinho.',
  })
  total_amount: number;
  @ApiProperty({
    description: 'Valor do desconto.',
  })
  discount: number;
  @ApiProperty({
    description: 'Informa se é presente ou não.',
  })
  is_gift: boolean;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CartProductCheckout {
  @ApiProperty({
    required: true,
    description: 'Id do produto.',
    minimum: 1,
  })
  @IsNotEmpty({ message: 'Favor informar o id do produto' })
  @IsNumber()
  id: number;

  @ApiProperty({
    required: true,
    description: 'Quantidade do produto.',
    minimum: 1,
  })
  @IsNotEmpty({ message: 'Favor informar a quantidade do produto' })
  @IsNumber()
  quantity: number;
}

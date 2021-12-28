import { IsNotEmpty, IsNumber } from 'class-validator';

export class CartProductCheckout {
  @IsNotEmpty({ message: 'Favor informar o id do produto' })
  @IsNumber()
  id: number;

  @IsNotEmpty({ message: 'Favor informar a quantidade do produto' })
  @IsNumber()
  quantity: number;
}

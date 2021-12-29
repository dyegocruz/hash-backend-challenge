import { Body, Controller, Post } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartCheckoutDto } from './dto/cart-checkout.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('checkout')
  async checkout(@Body() dto: CartCheckoutDto) {
    return await this.cartService.checkout(dto);
  }
}

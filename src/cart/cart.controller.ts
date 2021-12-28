import { Body, Controller, Post } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartCheckout } from './dto/cart-checkout.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('checkout')
  checkout(@Body() dto: CartCheckout) {
    return this.cartService.checkout(dto);
  }
}

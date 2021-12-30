import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { CartCheckoutDto } from './dto/cart-checkout.dto';
import { CartCheckout } from './interface/cart-checkout-response.interface';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('checkout')
  @ApiOperation({
    description: 'Adicionar produtos no carrinho de compras.',
  })
  @ApiResponse({
    status: 201,
    isArray: false,
    type: CartCheckout,
  })
  async checkout(@Body() dto: CartCheckoutDto) {
    return await this.cartService.checkout(dto);
  }
}

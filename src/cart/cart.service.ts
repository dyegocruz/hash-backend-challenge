import { Injectable } from '@nestjs/common';
import { ProductService } from '../product/product.service';
import { CartCheckout } from './dto/cart-checkout.dto';
import { CartCheckoutResponse } from './interface/cart-checkout-response.interface';
import { CartProduct } from './interface/cart-product.interface';

@Injectable()
export class CartService {
  constructor(private readonly productService: ProductService) {}
  checkout(dto: CartCheckout) {
    const cartResponse: CartCheckoutResponse = {
      total_amount: 0,
      total_amount_with_discount: 0,
      total_discount: 0,
      products: [],
    };

    dto.products.forEach((productDto) => {
      const product = this.productService.findOne(productDto.id);
      const cartProduct: CartProduct = {
        id: product.id,
        quantity: productDto.quantity,
        discount: 0,
        is_gift: product.is_gift,
        total_amount: product.amount * productDto.quantity,
        unit_amount: product.amount,
      };
      cartResponse.products.push(cartProduct);

      cartResponse.total_amount += cartProduct.total_amount;
      cartResponse.total_amount_with_discount +=
        cartProduct.total_amount - cartProduct.discount;
      cartResponse.total_discount += cartProduct.discount;
    });
    return cartResponse;
  }
}

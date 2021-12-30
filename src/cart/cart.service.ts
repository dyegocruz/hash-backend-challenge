import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DateTime } from 'luxon';
import { DiscountService } from '../discount/discount.service';
import { ProductService } from '../product/product.service';
import { CartCheckoutDto } from './dto/cart-checkout.dto';
import { CartProductCheckout } from './dto/cart-product-checkout.dto';
import { CartCheckoutResponse } from './interface/cart-checkout-response.interface';
import { CartProduct } from './interface/cart-product.interface';

@Injectable()
export class CartService {
  private readonly logger = new Logger(CartService.name);

  constructor(
    private readonly productService: ProductService,
    private readonly discountService: DiscountService,
    private readonly configService: ConfigService,
  ) {}

  async checkout(dto: CartCheckoutDto): Promise<CartCheckoutResponse> {
    let cartResponse: CartCheckoutResponse = {
      total_amount: 0,
      total_amount_with_discount: 0,
      total_discount: 0,
      products: [],
    };
    cartResponse = await this.treatCartProducts(cartResponse, dto.products);
    cartResponse = await this.treatBrackFriday(cartResponse);
    return cartResponse;
  }

  async treatCartProducts(
    cartCheckout: CartCheckoutResponse,
    productDotList: Array<CartProductCheckout>,
  ): Promise<CartCheckoutResponse> {
    for (const productDto of productDotList) {
      const product = this.productService.findOne(productDto.id);

      if (product && !product.is_gift) {
        const productDiscountPercentage =
          await this.discountService.getProductDiscount(product.id);
        const discountValue = this.calcDiscountValue(
          product.amount,
          productDiscountPercentage,
        );
        const totalAmount = this.calcTotalAmount(
          product.amount,
          productDto.quantity,
          discountValue,
        );

        const cartProduct: CartProduct = {
          id: product.id,
          quantity: productDto.quantity,
          discount: discountValue,
          is_gift: product.is_gift,
          total_amount: totalAmount,
          unit_amount: product.amount,
        };
        cartCheckout.products.push(cartProduct);

        cartCheckout.total_amount += cartProduct.total_amount;
        cartCheckout.total_amount_with_discount +=
          cartProduct.total_amount - cartProduct.discount;
        cartCheckout.total_discount += cartProduct.discount;
      }
    }
    return cartCheckout;
  }

  async treatBrackFriday(
    cartCheckout: CartCheckoutResponse,
  ): Promise<CartCheckoutResponse> {
    const blackFridayDate = DateTime.fromISO(
      this.configService.get('DATE_BLACK_FRIDAY'),
    );
    const today = DateTime.now();

    if (blackFridayDate.hasSame(today, 'day')) {
      const productGift = await this.productService.findOneGift();
      if (productGift) {
        const cartProductGift: CartProduct = {
          id: productGift.id,
          quantity: 1,
          discount: 0,
          is_gift: productGift.is_gift,
          total_amount: productGift.amount,
          unit_amount: productGift.amount,
        };
        cartCheckout.products.push(cartProductGift);

        // TODO - descomentar ao confirmar se o valor do produto de brinde deve ser somado ao valor total do carrinho
        // cartCheckout.total_amount += cartProductGift.total_amount;
        // cartCheckout.total_amount_with_discount += cartProductGift.total_amount;
      }
    }

    return cartCheckout;
  }

  calcTotalAmount(
    productValue: number,
    quantity: number,
    discountValue: number,
  ): number {
    return productValue - discountValue * quantity;
  }

  calcDiscountValue(productValue: number, discountPercentage: number): number {
    let discountCalc = 0;
    discountCalc = Math.floor(productValue * discountPercentage);
    return discountCalc;
  }
}

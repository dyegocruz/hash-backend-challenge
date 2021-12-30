import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { DiscountModule } from '../discount/discount.module';
import { ProductModule } from '../product/product.module';
import { CartService } from './cart.service';
import { CartCheckoutDto } from './dto/cart-checkout.dto';

class CartServiceMock {
  checkout() {
    return {};
  }
  calcTotalAmount() {
    return 0;
  }
  calcDiscountValue() {
    return 0;
  }
  treatCartProducts() {
    return {};
  }
  treatBrackFriday() {
    return {};
  }
}

describe('CartService', () => {
  let service: CartService;

  beforeEach(async () => {
    const CartServiceProvider = {
      provide: CartService,
      useClass: CartServiceMock,
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [ProductModule, DiscountModule, ConfigModule],
      providers: [CartService, CartServiceProvider],
    }).compile();

    service = module.get<CartService>(CartService);
  });

  it('CartService - should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call checkout method with expected params', async () => {
    const checkoutSpy = jest.spyOn(service, 'checkout');
    const dto = new CartCheckoutDto();
    service.checkout(dto);
    expect(checkoutSpy).toHaveBeenCalledWith(dto);
  });

  it('should call treatCartProducts method with expected params', async () => {
    const treatCartProductsSpy = jest.spyOn(service, 'treatCartProducts');
    const cartResponse = {
      total_amount: 75513,
      total_amount_with_discount: 75513,
      total_discount: 0,
      products: [
        {
          id: 1,
          quantity: 2,
          discount: 0,
          is_gift: false,
          total_amount: 15157,
          unit_amount: 15157,
        },
        {
          id: 3,
          quantity: 2,
          discount: 0,
          is_gift: false,
          total_amount: 60356,
          unit_amount: 60356,
        },
      ],
    };
    const listProducts = [];
    service.treatCartProducts(cartResponse, listProducts);
    expect(treatCartProductsSpy).toHaveBeenCalledWith(
      cartResponse,
      listProducts,
    );
  });

  it('should call treatBrackFriday method with expected params', async () => {
    const treatBrackFridaySpy = jest.spyOn(service, 'treatBrackFriday');
    const cartResponse = {
      total_amount: 75513,
      total_amount_with_discount: 75513,
      total_discount: 0,
      products: [
        {
          id: 1,
          quantity: 2,
          discount: 0,
          is_gift: false,
          total_amount: 15157,
          unit_amount: 15157,
        },
        {
          id: 3,
          quantity: 2,
          discount: 0,
          is_gift: false,
          total_amount: 60356,
          unit_amount: 60356,
        },
      ],
    };
    service.treatBrackFriday(cartResponse);
    expect(treatBrackFridaySpy).toHaveBeenCalledWith(cartResponse);
  });

  it('should call calcTotalAmount method with expected params', async () => {
    const calcTotalAmountSpy = jest.spyOn(service, 'calcTotalAmount');
    const productValue = Math.random();
    const quantity = Math.random();
    const discountValue = Math.random();
    service.calcTotalAmount(productValue, quantity, discountValue);
    expect(calcTotalAmountSpy).toHaveBeenCalledWith(
      productValue,
      quantity,
      discountValue,
    );
  });

  it('should call calcDiscountValue method with expected params', async () => {
    const calcDiscountValueSpy = jest.spyOn(service, 'calcDiscountValue');
    const productValue = Math.random();
    const discountPercentage = Math.random();
    service.calcDiscountValue(productValue, discountPercentage);
    expect(calcDiscountValueSpy).toHaveBeenCalledWith(
      productValue,
      discountPercentage,
    );
  });
});

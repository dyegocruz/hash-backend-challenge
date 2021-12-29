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
}

describe('CartService', () => {
  let service: CartService;

  beforeEach(async () => {
    const CartServiceProvider = {
      provide: CartService,
      useClass: CartServiceMock,
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [ProductModule, DiscountModule],
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

import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { DiscountModule } from '../discount/discount.module';
import { ProductModule } from '../product/product.module';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';

describe('CartController', () => {
  let controller: CartController;
  let service: CartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ProductModule, DiscountModule, ConfigModule],
      controllers: [CartController],
      providers: [CartService],
    }).compile();

    controller = module.get<CartController>(CartController);
    service = module.get<CartService>(CartService);
  });

  it('CartController - should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('checkout', () => {
    it('should return object of CartCheckoutResponse', async () => {
      const body = {
        products: [
          {
            id: 1,
            quantity: 2,
          },
          {
            id: 3,
            quantity: 2,
          },
        ],
      };

      const result = {
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

      jest
        .spyOn(service, 'checkout')
        .mockImplementation(async () => await result);

      expect(await controller.checkout(body)).toBe(result);
    });
  });
});

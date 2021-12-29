import { Test, TestingModule } from '@nestjs/testing';
import { DiscountModule } from '../discount/discount.module';
import { ProductModule } from '../product/product.module';
import { CartService } from './cart.service';

describe('CartService', () => {
  let service: CartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ProductModule, DiscountModule],
      providers: [CartService],
    }).compile();

    service = module.get<CartService>(CartService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

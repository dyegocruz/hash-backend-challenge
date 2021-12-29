import { Test, TestingModule } from '@nestjs/testing';
import { DiscountService } from './discount.service';

class DiscountServiceMock {
  getProductDiscount() {
    return 0;
  }
}

describe('DiscountService', () => {
  let service: DiscountService;

  beforeEach(async () => {
    const DiscountServiceProvider = {
      provide: DiscountService,
      useClass: DiscountServiceMock,
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [DiscountService, DiscountServiceProvider],
    }).compile();

    service = module.get<DiscountService>(DiscountService);
  });

  it('DiscountService - should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call getProductDiscount method with expected params', async () => {
    const getProductDiscountSpy = jest.spyOn(service, 'getProductDiscount');
    const productId = Math.random();
    service.getProductDiscount(productId);
    expect(getProductDiscountSpy).toHaveBeenCalledWith(productId);
  });
});

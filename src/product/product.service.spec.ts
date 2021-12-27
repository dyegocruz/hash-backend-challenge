import { Test, TestingModule } from '@nestjs/testing';
import { ProductRepository } from './product.repository';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService, ProductRepository],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('ProductService - should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return array of product', () => {
      const result = [
        {
          id: 3,
          title: 'Produto de teste',
          description: 'Desrição de teste do produto.',
          amount: 60356,
          is_gift: false,
        },
      ];

      jest.spyOn(service, 'findAll').mockImplementation(() => result);

      expect(service.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return an object of product', () => {
      const id = 1;
      const result = {
        id: 1,
        title: 'Produto de teste',
        description: 'Desrição de teste do produto.',
        amount: 15157,
        is_gift: false,
      };

      jest.spyOn(service, 'findOne').mockImplementation(() => result);

      expect(service.findOne(id)).toBe(result);
    });
  });
});

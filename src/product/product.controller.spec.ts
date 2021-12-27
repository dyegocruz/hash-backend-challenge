import { Test, TestingModule } from '@nestjs/testing';
import { Product } from './entities/product.entity';
import { ProductController } from './product.controller';
import { ProductRepository } from './product.repository';
import { ProductService } from './product.service';

describe('ProductController', () => {
  let controller: ProductController;
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductService, ProductRepository],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    service = module.get<ProductService>(ProductService);
  });

  it('ProductController should be defined', () => {
    expect(controller).toBeDefined();
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

      expect(controller.findAll()).toBe(result);
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

      expect(controller.findOne(id)).toBe(result);
    });
  });
});

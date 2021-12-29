import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ProductModule } from '../src/product/product.module';
import { ProductService } from '../src/product/product.service';

describe('ProductController (e2e)', () => {
  let app: INestApplication;
  const productService = {
    findAll: () => [
      {
        id: 3,
        title: 'Produto de teste',
        description: 'Desrição de teste do produto.',
        amount: 60356,
        is_gift: false,
      },
    ],
    findOne: () => ({
      id: 6,
      title: 'Produto de teste',
      description: 'Desrição de teste do produto.',
      amount: 15157,
      is_gift: false,
    }),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ProductModule],
    })
      .overrideProvider(ProductService)
      .useValue(productService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('/product (GET)', () => {
    return request(app.getHttpServer())
      .get('/product')
      .expect(200)
      .expect(productService.findAll());
  });

  it('/product/:id (GET)', () => {
    const id = 1;
    return request(app.getHttpServer())
      .get(`/product/${id}`)
      .expect(200)
      .expect(productService.findOne());
  });
});

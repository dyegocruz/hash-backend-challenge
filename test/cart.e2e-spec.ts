import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CartModule } from '../src/cart/cart.module';
import { CartService } from '../src/cart/cart.service';

describe('CartController (e2e)', () => {
  let app: INestApplication;
  const cartService = {
    checkout: () => ({
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
      ],
    }),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CartModule],
    })
      .overrideProvider(CartService)
      .useValue(cartService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('/cart/checkout (POST)', async () => {
    const dto = {
      products: [
        {
          id: 1,
          quantity: 2,
        },
      ],
    };
    return request(app.getHttpServer())
      .post(`/cart/checkout`)
      .send(dto)
      .expect(201)
      .expect(cartService.checkout());
  });
});

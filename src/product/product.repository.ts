import { Injectable } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { products } from './product.db';

@Injectable()
export class ProductRepository {
  getAll(): Array<Product> {
    return products.filter((product) => !product.is_gift);
  }

  getOne(id: number): Product {
    return products.find((product) => product.id == id);
  }

  getOneGift(): Product {
    return products.find((product) => product.is_gift);
  }
}

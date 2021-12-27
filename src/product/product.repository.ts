import { Injectable } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { products } from './product.db';

@Injectable()
export class ProductRepository {
  getAll(): Array<Product> {
    return products;
  }

  getOne(id: number): Product {
    return products.find((product) => product.id == id);
  }
}

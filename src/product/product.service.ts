import { Injectable } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  findAll(): Array<Product> {
    return this.productRepository.getAll();
  }

  findOne(id: number) {
    return this.productRepository.getOne(id);
  }
}

import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    const product = this.productService.findOne(+id);
    if (product) return product;
    else
      throw new BadRequestException({
        mensagem: 'Não foi possível encontrar o produto informado.',
      });
  }
}

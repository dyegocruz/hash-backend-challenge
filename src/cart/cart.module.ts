import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { ProductModule } from '../product/product.module';
import { DiscountModule } from '../discount/discount.module';

@Module({
  imports: [ProductModule, DiscountModule],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}

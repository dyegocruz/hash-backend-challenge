import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { CartModule } from './cart/cart.module';
import { ProductModule } from './product/product.module';
import { DiscountModule } from './discount/discount.module';

@Module({
  imports: [ConfigModule.forRoot(), CartModule, ProductModule, DiscountModule],
  controllers: [AppController],
})
export class AppModule {}

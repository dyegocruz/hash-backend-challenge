import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DiscountService } from './discount.service';

@Module({
  imports: [ConfigModule],
  providers: [DiscountService],
  exports: [DiscountService],
})
export class DiscountModule {}

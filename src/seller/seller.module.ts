import { Module } from '@nestjs/common';
import { SellerController } from './seller.controller';
import { SellerService } from './seller.service';
import { IsUniqueSellerNameValidator } from './validators/seller.is-unique.validator';

@Module({
  controllers: [SellerController],
  providers: [IsUniqueSellerNameValidator, SellerService],
})
export class SellerModule {}

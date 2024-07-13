import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { CreateSellerDto } from './create-seller.dto';
import { IsUniqueSellerName } from '../validators/seller.is-unique.decorator';

export class UpdateSellerDto extends PartialType(CreateSellerDto) {
  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  @IsUniqueSellerName({ message: 'Ja existem outros vendedores com esse nome' })
  name: string;
}

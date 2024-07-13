import { IsNotEmpty, IsString, Length } from 'class-validator';
import { IsUniqueSellerName } from '../validators/seller.is-unique.decorator';

export class CreateSellerDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  @IsUniqueSellerName({ message: 'Ja existem outros vendedores com esse nome' })
  name: string;
}

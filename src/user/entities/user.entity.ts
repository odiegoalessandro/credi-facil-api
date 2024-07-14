import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { IsUniqueUserName } from '../validators/user.is-unique.decorator';

export class User {
  @IsInt()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  @IsUniqueUserName({ message: 'Username already exists' })
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsInt()
  @IsNotEmpty()
  sellerId: number;
}

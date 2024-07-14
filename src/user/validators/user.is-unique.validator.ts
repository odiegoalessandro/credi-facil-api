import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserService } from '../user.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsUniqueUserByUsernameValidator
  implements ValidatorConstraintInterface
{
  constructor(private userService: UserService) {}

  async validate(value: string): Promise<boolean> {
    const userExists = await this.userService.existsByName(value);

    return !userExists;
  }
}

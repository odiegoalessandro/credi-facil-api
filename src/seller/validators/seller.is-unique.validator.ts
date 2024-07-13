import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { SellerService } from '../seller.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsUniqueSellerNameValidator
  implements ValidatorConstraintInterface
{
  constructor(private readonly sellerService: SellerService) {}

  async validate(value: string): Promise<boolean> {
    const userExists = await this.sellerService.existsWithName(value);

    return !userExists;
  }

  defaultMessage(args: ValidationArguments) {
    const params = args.constraints[0];
    if (!params.message) return `the ${args.property} already exists`;
    else return params.message;
  }
}

import { ValidationOptions, registerDecorator } from 'class-validator';
import { IsUniqueSellerNameValidator } from './seller.is-unique.validator';

export const IsUniqueSellerName = (options: ValidationOptions) => {
  return (obj: object, prop: string) => {
    registerDecorator({
      target: obj.constructor,
      propertyName: prop,
      constraints: [],
      options,
      validator: IsUniqueSellerNameValidator,
    });
  };
};

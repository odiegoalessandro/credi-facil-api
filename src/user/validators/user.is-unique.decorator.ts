import { ValidationOptions, registerDecorator } from 'class-validator';
import { IsUniqueSellerNameValidator } from 'src/seller/validators/seller.is-unique.validator';

export const IsUniqueUserName = (options: ValidationOptions) => {
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

import {
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

export function IsStringOrUndefined(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isStringOrUndefined',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return typeof value === 'undefined' || typeof value === 'string';
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a string or undefined.`;
        },
      },
    });
  };
}
